import { useReducer, useEffect, useContext } from 'react'
import styled from 'styled-components'
import Input from '../UI/Input'
import DataContext from '../../store/DataContext'
import { getRandomInt, getUniqId } from '../../utils'
import { Button } from '../UI/Button'

const StyledCharacterForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  border: 1px solid black;
  padding: 20px;
  width: 100%;

  .submit {
    font-size: 18px;
    width: 400px;
    height: 60px;
    padding: 15px 10px;
    border: none;
    outline: none;
    cursor: pointer;
    margin-top: 25px;
  }

  .submit:hover,
  .submit:focus-visible {
    outline: 2px solid black;
  }

  .boxContainer {
    width: 400px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
  }

  .radioContainer {
    width: 190px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 10px;

    label {
      font-size: 18px;
      margin-left: 10px;
    }
  }

  .checkbox {
    width: 190px;
    display: flex;
    align-items: center;

    label {
      font-size: 18px;
      margin-left: 10px;
    }
  }
`

const formReducer = (state, action) => {
  if (action.type === 'USER_INPUT_TEXT') {
    return {
      ...state,
      [action.field]: {
        value: action.value,
        isValid: isFieldValid(action.field, action.value),
      },
    }
  }
  if (action.type === 'USER_INPUT_RADIO') {
    return {
      ...state,
      [action.field]: action.value,
    }
  }
  if (action.type === 'USER_INPUT_CHECKBOX') {
    const val = action.value === 'true' ? false : true
    return {
      ...state,
      [action.field]: val,
    }
  }
  if (action.type === 'FORM_VALIDATION') {
    return {
      ...state,
      isFormValid: isFormValid(state),
    }
  }
  if (action.type === 'CLEAR_FORM') {
    return {
      ...initialFormState,
    }
  }

  return { ...state }
}

const initialFormState = {
  title: {
    value: '',
    isValid: false,
  },
  description: {
    value: '',
    isValid: false,
  },
  url: {
    value: '',
    isValid: true,
  },
  force: {
    value: 50,
    isValid: true,
  },
  sideId: 'side-0',
  isShown: true,
  isFormValid: false,
}

const isFormValid = (formState) => {
  for (const value of Object.values(formState)) {
    if (value.isValid === false) return false
  }
  return true
}

const isFieldValid = (name, value) => {
  if (name === 'title') {
    return value.length > 1 && value.length < 20
  }
  if (name === 'description') {
    return value.length > 5 && value.length < 200
  }
  if (name === 'url') {
    return true
  }
  if (name === 'force') {
    const int = parseInt(value)
    return int >= 0 && int <= 100
  }
  return false
}

const CharacterForm = () => {
  const dataCtx = useContext(DataContext)
  const [formState, dispatchForm] = useReducer(formReducer, initialFormState)

  const handleTextChange = (e) => {
    dispatchForm({
      type: 'USER_INPUT_TEXT',
      field: e.target.name,
      value: e.target.value,
    })
  }

  const handleRadioChange = (e) => {
    dispatchForm({
      type: 'USER_INPUT_RADIO',
      field: e.target.name,
      value: e.target.value,
    })
  }

  const handleCheckboxChange = (e) => {
    dispatchForm({
      type: 'USER_INPUT_CHECKBOX',
      field: e.target.name,
      value: e.target.value,
    })
  }

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatchForm({
        type: 'FORM_VALIDATION',
      })
    }, 500)
    return () => {
      clearTimeout(timerId)
    }
  }, [
    formState.title.value,
    formState.description.value,
    formState.url.value,
    formState.force.value,
  ])

  const handleSubmit = (e) => {
    e.preventDefault()
    const title = formState.title.value
    const description = formState.description.value
    const url =
      formState.url.value ||
      `https://picsum.photos/id/${getRandomInt(1, 999)}/200`
    const force = parseInt(formState.force.value)
    const sideId = formState.sideId
    const isShown = formState.isShown
    const id = getUniqId()
    dataCtx.setOneCharacter({
      title,
      description,
      url,
      force,
      sideId,
      isShown,
      id,
    })
    dataCtx.addCharacterToList(sideId, id)
    dispatchForm({
      type: 'CLEAR_FORM',
    })
  }

  return (
    <StyledCharacterForm onSubmit={handleSubmit} autoComplete="off">
      <Input
        label="Name"
        isValid={formState.title.isValid}
        input={{
          id: 'input-character-name',
          name: 'title',
          placeholder: 'Name',
          onChange: handleTextChange,
          value: formState.title.value,
        }}
      />
      <Input
        label="Description"
        isValid={formState.description.isValid}
        input={{
          id: 'input-character-description',
          name: 'description',
          placeholder: 'Description',
          onChange: handleTextChange,
          value: formState.description.value,
        }}
      />
      <Input
        label="URL"
        isValid={formState.url.isValid}
        input={{
          id: 'input-character-url',
          name: 'url',
          placeholder: 'URL',
          onChange: handleTextChange,
          value: formState.url.value,
        }}
      />
      <Input
        label="Force"
        isValid={formState.force.isValid}
        input={{
          id: 'input-character-force',
          name: 'force',
          placeholder: 'Force',
          onChange: handleTextChange,
          value: formState.force.value,
          type: 'range',
          min: '0',
          max: '100',
          step: '1',
        }}
      />
      <div className="boxContainer">
        <div className="radioContainer">
          {dataCtx.sideOrder.map((sideId) => {
            const side = dataCtx.sides[sideId]
            if (!side) return null
            return (
              <div key={side.id}>
                <input
                  type="radio"
                  id={`input-radio-side-${side.id}`}
                  name="sideId"
                  value={side.id}
                  checked={formState.sideId === side.id}
                  onChange={handleRadioChange}
                />
                <label htmlFor={`input-radio-side-${side.id}`}>
                  {side.name}
                </label>
              </div>
            )
          })}
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            name="isShown"
            value={formState.isShown}
            checked={formState.isShown}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="isShown">Show?</label>
        </div>
      </div>
      <Button
        as="input"
        type="submit"
        value="Submit"
        className="primary wide"
        disabled={!formState.isFormValid}
      />
    </StyledCharacterForm>
  )
}

export default CharacterForm
