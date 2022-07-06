import { useContext } from 'react'
import AuthContext from '../../store/AuthContext'
import ModalContext from '../../store/ModalContext'
import { Button } from '../UI/Button'
import Modal from '../UI/Modal'

const LogoutModal = (props) => {
  const authCtx = useContext(AuthContext)
  const modalCtx = useContext(ModalContext)

  const confirm = () => {
    authCtx.onLogout()
    modalCtx.hide()
  }

  return (
    <Modal onBackdrop={modalCtx.hide}>
      <div>Would you like to logout?</div>
      <Button onClick={confirm}>OK</Button>
    </Modal>
  )
}

export default LogoutModal
