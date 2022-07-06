import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { AwsomeButton } from '../UI/Button'

const StyledDeleteControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;

  div {
    font-size: 36px;
    font-weight: 700;
    margin: 10px 0;
  }

  .remove-icon--yes {
    transform: translateX(25px);
  }
`

const DeleteControl = ({ deleteCharacter }) => {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    if (display) {
      const timeout = setTimeout(() => {
        setDisplay(false)
      }, 4000)
      return () => clearTimeout(timeout)
    }
  }, [display])
  return (
    <StyledDeleteControl>
      {display ? (
        <>
          <AwsomeButton
            onClick={deleteCharacter}
            icon="fa-solid fa-circle-check"
            className="icon remove-icon remove-icon--yes small"
          />
          <AwsomeButton
            onClick={() => setDisplay(false)}
            icon="fa-solid fa-circle-xmark"
            className="icon remove-icon small"
          />
        </>
      ) : (
        <AwsomeButton
          onClick={() => setDisplay(true)}
          icon="fa-solid fa-trash"
          className="icon remove-icon small"
        />
      )}
    </StyledDeleteControl>
  )
}

export default DeleteControl
