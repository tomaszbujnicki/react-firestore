import { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import CharacterList from './CharacterList'
import DataContext from '../../store/DataContext'
import { DragDropContext } from 'react-beautiful-dnd'

const StyledCharacterBoard = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
`

const CharacterBoard = () => {
  const dataCtx = useContext(DataContext)
  const [sides, setSides] = useState([])

  useEffect(() => {
    setSides(dataCtx.sides)
    console.log('CharacterBoard useEffect dataCtx.sides')
  }, [dataCtx.sides])

  const handleDragEnd = ({ destination, source, draggableId }) => {
    if (!destination) return

    const isSameList = destination.droppableId === source.droppableId
    const isSameIndex = destination.index === source.index

    if (isSameList && isSameIndex) return

    const oldSideId = source.droppableId
    const newSideId = destination.droppableId
    const oldSideIndex = source.index
    const newSideIndex = destination.index
    const characterId = draggableId

    const oldSide = sides[oldSideId]
    const newSide = sides[newSideId]

    oldSide.characterList.splice(source.index, 1)
    newSide.characterList.splice(destination.index, 0, characterId)

    setSides((sides) => ({ ...sides, oldSide, newSide }))

    if (isSameList) {
      dataCtx.moveCharacterInsideSide(
        characterId,
        oldSideId,
        oldSideIndex,
        newSideIndex
      )
    } else {
      dataCtx.moveCharacterBetweenSides(
        characterId,
        oldSideId,
        newSideId,
        newSideIndex
      )
    }
  }

  return (
    <StyledCharacterBoard>
      <DragDropContext onDragEnd={handleDragEnd}>
        {dataCtx.sideOrder.map((sideId) => {
          const side = sides[sideId]
          if (!side) return null
          return (
            <CharacterList
              key={side.name}
              id={side.id}
              name={side.name}
              title={side.title}
              characters={side.characterList
                .map((id) => dataCtx.characters.find((char) => char.id === id))
                .filter((x) => x)}
            />
          )
        })}
      </DragDropContext>
    </StyledCharacterBoard>
  )
}

export default CharacterBoard
