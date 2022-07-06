import { createContext, useState } from 'react'

const ModalContext = createContext({
  type: null,
  show: () => {},
  hide: () => {},
})

export default ModalContext

export const ModalContextProvider = (props) => {
  const [type, setType] = useState(null)
  const [modalProps, setModalProps] = useState(null)

  const show = (type) => {
    setType(type)
  }

  const hide = () => {
    setType(null)
  }

  return (
    <ModalContext.Provider
      value={{
        type,
        modalProps,
        setModalProps,
        show,
        hide,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}
