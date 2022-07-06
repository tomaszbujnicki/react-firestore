import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'

const StyledButton = styled.button`
  font-size: 18px;
  height: 60px;
  padding: 15px 10px;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 5px;
  background: #eeeeee;

  :focus-visible {
    outline: 2px solid black;
  }

  :hover,
  :focus-visible {
    background: #cccccc;
  }

  :disabled {
    opacity: 0.65;
    cursor: default;
    background: #eeeeee;
  }

  &.small {
    height: 30px;
  }

  &.wide {
    width: 400px;
  }

  &.primary {
    background: rgb(184, 134, 11);

    :hover,
    :focus-visible {
      background: rgb(216, 166, 43);
    }

    :disabled {
      background: rgba(184, 134, 11, 0.5);
    }
  }

  &.secondary {
    background: rgb(11, 61, 184);
    color: white;

    :hover,
    :focus-visible {
      background: rgb(43, 93, 216);
    }

    :disabled {
      background: rgba(11, 61, 184, 0.5);
    }
  }
`

const StyledAwsomeButton = styled(StyledButton)`
  width: 60px;
  padding: 10px;
  font-size: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: auto;
    height: auto;
  }

  &.small {
    padding: 5px;
    width: 30px;
  }

  &.icon {
    background: transparent;
    border: none;
    outline: none;

    :hover,
    :focus-visible {
      color: rgb(216, 166, 43);
    }

    :disabled {
      color: rgba(184, 134, 11, 0.5);
    }
  }
`

export const Button = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

export const AwsomeButton = ({ icon, ...rest }) => {
  return (
    <StyledAwsomeButton {...rest}>
      <FontAwesomeIcon icon={icon} />
    </StyledAwsomeButton>
  )
}
