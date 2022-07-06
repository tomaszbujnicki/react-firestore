import { useContext } from 'react'
import ModalContext from '../../store/ModalContext'
import LogoutModal from './LogoutModal'
import SettingsModal from './SettingsModal'
import WelcomeModal from './WelcomeModal'

const modalComponents = {
  logout: LogoutModal,
  welcome: WelcomeModal,
  settings: SettingsModal,
}

const GlobalModal = () => {
  const modalCtx = useContext(ModalContext)
  const Component = modalComponents[modalCtx.type]

  if (!Component) return null
  return <Component />
}

export default GlobalModal
