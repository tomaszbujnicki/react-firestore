import ReactDOM from 'react-dom'
import styled from 'styled-components'

const StyledModal = styled.div`
  position: fixed;
  z-index: 100;
  width: 40%;
  left: 30%;
  top: 20%;
  overflow: hidden;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 16px black;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`

const StyledBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(100, 100, 100, 0.75);
  z-index: 10;
`

const rootModal = document.getElementById('modal-root')
const rootBackdrop = document.getElementById('backdrop-root')

const Modal = ({ children, onBackdrop }) => {
  return (
    <>
      {ReactDOM.createPortal(<StyledModal>{children}</StyledModal>, rootModal)}
      {ReactDOM.createPortal(
        <StyledBackdrop onClick={onBackdrop}></StyledBackdrop>,
        rootBackdrop
      )}
    </>
  )
}

export default Modal
