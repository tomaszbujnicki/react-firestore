import { useContext, useEffect } from 'react'
import AuthContext from '../../store/AuthContext'
import ModalContext from '../../store/ModalContext'
import Modal from '../UI/Modal'

const WelcomeModal = () => {
  const modalCtx = useContext(ModalContext)
  const authCtx = useContext(AuthContext)
  useEffect(() => {
    const timeout = setTimeout(() => modalCtx.hide, 5000)
    return () => {
      clearTimeout(timeout)
    }
  }, [modalCtx])
  return (
    <Modal onBackdrop={modalCtx.hide}>
      <div>Welcome back</div>
      <div>{authCtx.name}</div>
    </Modal>
  )
}

export default WelcomeModal
