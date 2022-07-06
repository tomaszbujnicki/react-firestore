import { useReducer, useContext } from 'react'
import Input from '../UI/Input'
import styled from 'styled-components'
import AuthContext from '../../store/AuthContext'
import ModalContext from '../../store/ModalContext'
import { Button } from '../UI/Button'

const StyledLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  padding: 20px;

  .title {
    font-size: 32px;
    margin-bottom: 10px;
  }
`

const nameReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: isNameValid(action.value),
    }
  }
  return { value: '', isValid: false }
}

const passwordReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return {
      value: action.value,
      isValid: isPasswordValid(action.value),
    }
  }
  return { value: '', isValid: false }
}

const isNameValid = (value) => value.length > 2 && value.length < 10
const isPasswordValid = (value) => value.length > 4 && value.length < 15

const Login = () => {
  const authCtx = useContext(AuthContext)
  const modalCtx = useContext(ModalContext)
  const [nameState, dispatchName] = useReducer(nameReducer, {
    value: '',
    isValid: false,
  })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: false,
  })

  const isFormValid = nameState.isValid && passwordState.isValid

  const nameChangeHandler = (e) => {
    dispatchName({ type: 'USER_INPUT', value: e.target.value })
  }

  const passwordChangeHandler = (e) => {
    dispatchPassword({ type: 'USER_INPUT', value: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    authCtx.onLogin({ name: nameState.value, password: passwordState.value })
    modalCtx.show('welcome')
  }

  return (
    <StyledLogin>
      <div className="title">Log in</div>
      <form className="Login" onSubmit={handleSubmit} autoComplete="off">
        <Input
          label="Name"
          isValid={nameState.isValid}
          input={{
            id: 'input-username',
            name: 'name',
            placeholder: 'Title',
            onChange: nameChangeHandler,
            value: nameState.value,
          }}
        />
        <Input
          label="Password"
          isValid={passwordState.isValid}
          input={{
            id: 'input-password',
            name: 'password',
            placeholder: 'Password',
            onChange: passwordChangeHandler,
            value: passwordState.value,
          }}
        />
        <Button
          as="input"
          type="submit"
          value="Submit"
          className="primary wide"
          disabled={!isFormValid}
        />
      </form>
    </StyledLogin>
  )
}

export default Login
