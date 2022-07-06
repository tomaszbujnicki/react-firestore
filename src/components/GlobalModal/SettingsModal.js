import { useContext } from 'react'
import Modal from '../UI/Modal'
import ThemeContext from '../../store/ThemeContext'
import ModalContext from '../../store/ModalContext'

const SettingsModal = () => {
  const themeCtx = useContext(ThemeContext)
  const modalCtx = useContext(ModalContext)

  return (
    <Modal onBackdrop={modalCtx.hide}>
      <div>Settings</div>
      <label>Chart backgroud color:</label>
      <input
        name="chart-color"
        type="color"
        value={themeCtx.chart.background}
        onInput={(e) => {
          themeCtx.changeChart('background', e.target.value)
        }}
      />
    </Modal>
  )
}

export default SettingsModal
