import { createContext, useEffect, useCallback, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check'
import {
  getFirestore,
  collection,
  setDoc,
  deleteDoc,
  onSnapshot,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  runTransaction,
} from 'firebase/firestore'
import { firebaseConfig, reCAPTCHAPublicKey } from '../config'

const app = initializeApp(firebaseConfig)
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(reCAPTCHAPublicKey),
  isTokenAutoRefreshEnabled: true,
})
const db = getFirestore(app)

const DataContext = createContext({
  sides: [],
  characters: [],
  setOneCharacter: () => {},
  updateOneCharacter: () => {},
})

export default DataContext

export const DataContextProvider = (props) => {
  const [sideOrder, setSideOrder] = useState([])
  const [sides, setSides] = useState({})
  const [characters, setCharacters] = useState([])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'side'), (snapshot) => {
      const sideOrder = []
      const sides = {}

      snapshot.forEach((doc) => {
        const side = doc.data()
        sideOrder.push(side.id)
        sides[side.id] = side
      })

      setSides(sides)
      setSideOrder(sideOrder)
      console.log(sides)
      console.log(sideOrder)
    })
    return () => {
      unsub()
    }
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'character'), (snapshot) => {
      const characters = []

      snapshot.forEach((doc) => {
        const character = doc.data()
        characters.push(character)
      })

      setCharacters(characters)
      console.log(characters)
    })
    return () => {
      unsub()
    }
  }, [])

  const setOneCharacter = useCallback(async (character) => {
    const characterRef = doc(db, 'character', character.id)

    try {
      await setDoc(characterRef, {
        ...character,
      })
      console.log('Character added successfully')
    } catch (e) {
      console.error('Character adding failed: ', e)
    }
  }, [])

  const updateOneCharacter = useCallback(
    async (id, props = {}, resolve, reject) => {
      const characterRef = doc(db, 'character', id)
      try {
        await new Promise((a) => setTimeout(a, 1000)) // for testing delay
        // if (Math.random() < 0.5) throw new Error("err"); // for testing success/fail
        await updateDoc(characterRef, {
          ...props,
        })
        resolve && resolve()
        console.log('Character edited successfully')
      } catch (e) {
        console.error('Character editing failed: ', e)
        reject && reject()
      }
    },
    []
  )

  const deleteOneCharacter = useCallback(async (id) => {
    const characterRef = doc(db, 'character', id)

    try {
      await deleteDoc(characterRef)
      console.log('Character deleted successfully')
    } catch (e) {
      console.error('Character deleting failed: ', e)
    }
  }, [])

  const moveCharacterBetweenSides = useCallback(
    async (characterId, oldSideId, newSideId, newSideIndex) => {
      try {
        const oldSideDocRef = doc(db, 'side', oldSideId)
        const newSideDocRef = doc(db, 'side', newSideId)
        await runTransaction(db, async (transaction) => {
          const oldSideDoc = await transaction.get(oldSideDocRef)
          const newSideDoc = await transaction.get(newSideDocRef)

          if (!oldSideDoc.exists() || !newSideDoc.exists()) {
            throw new Error('Document does not exist!')
          }
          const newSide = newSideDoc.data()

          const isDataSync = () => {
            // check
            return true
          }

          if (!isDataSync) {
            throw new Error('Data is out of sync!')
          }
          newSide.characterList.splice(newSideIndex, 0, characterId)

          transaction.update(oldSideDocRef, {
            characterList: arrayRemove(characterId),
          })
          transaction.update(newSideDocRef, {
            characterList: newSide.characterList,
          })
        })
        console.log('Transaction successfully committed!')
      } catch (e) {
        console.log('Transaction failed: ', e)
      }
    },
    []
  )

  const moveCharacterInsideSide = useCallback(
    async (characterId, sideId, oldIndex, newIndex) => {
      try {
        const sideDocRef = doc(db, 'side', sideId)
        await runTransaction(db, async (transaction) => {
          const sideDoc = await transaction.get(sideDocRef)

          if (!sideDoc.exists()) {
            throw new Error('Document does not exist!')
          }
          const side = sideDoc.data()

          const isDataSync = () => {
            // check
            return true
          }

          if (!isDataSync) {
            throw new Error('Data is out of sync!')
          }
          const characterList = side.characterList
          characterList.splice(oldIndex, 1)
          characterList.splice(newIndex, 0, characterId)

          transaction.update(sideDocRef, { characterList: characterList })
        })
        console.log('Transaction successfully committed!')
      } catch (e) {
        console.log('Transaction failed: ', e)
      }
    },
    []
  )

  const removeCharacterFromList = useCallback(async (sideId, characterId) => {
    const sideRef = doc(db, 'side', sideId)
    try {
      await updateDoc(sideRef, {
        characterList: arrayRemove(characterId),
      })
      console.log('Character removed form list')
    } catch (e) {
      console.error('Character removing failed: ', e)
    }
  }, [])

  const addCharacterToList = useCallback(async (sideId, characterId) => {
    const sideRef = doc(db, 'side', sideId)
    try {
      await updateDoc(sideRef, {
        characterList: arrayUnion(characterId),
      })
      console.log('Character added to list')
    } catch (e) {
      console.error('Character adding failed: ', e)
    }
  }, [])

  const updateCharacterList = useCallback(async (sideId, characterList) => {
    const sideRef = doc(db, 'side', sideId)
    try {
      // todo: check if local characterList === db characterList
      // const ref = collection(db, "side", sideId);
      // const side = await getDoc(ref).data();
      // const characterList = side.characterList;
      await updateDoc(sideRef, {
        characterList,
      })
      console.log('Character added to list')
    } catch (e) {
      console.error('Character adding failed: ', e)
    }
  }, [])

  return (
    <DataContext.Provider
      value={{
        sideOrder,
        sides,
        characters,
        setOneCharacter,
        updateOneCharacter,
        deleteOneCharacter,
        removeCharacterFromList,
        addCharacterToList,
        updateCharacterList,
        moveCharacterBetweenSides,
        moveCharacterInsideSide,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
