import { useContext } from 'react'
import styled from 'styled-components'
import { AwsomeButton } from '../UI/Button'
import AuthContext from '../../store/AuthContext'
import ModalContext from '../../store/ModalContext'

const StyledHeader = styled.header`
  position: fixed;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
  width: 100%;
  height: 50px;
  background-color: #dddddd;
  padding: 0 20px;
  z-index: 99;
`
const Header = () => {
  const authCtx = useContext(AuthContext)
  const modalCtx = useContext(ModalContext)

  return (
    <StyledHeader>
      {authCtx.isLoggedIn && (
        <>
          <AwsomeButton
            onClick={() => modalCtx.show('settings')}
            icon="fa-solid fa-sliders"
            className="small"
          />
          <AwsomeButton
            onClick={() => modalCtx.show('logout')}
            icon="fa-solid fa-arrow-right-from-bracket"
            className="small"
          />
        </>
      )}
    </StyledHeader>
  )
}

export default Header
