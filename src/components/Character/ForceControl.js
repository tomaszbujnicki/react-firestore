import styled from 'styled-components'
import { AwsomeButton } from '../UI/Button'

const StyledForceControl = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50px;

  div {
    font-size: 36px;
    font-weight: 700;
    margin: 10px 0;
  }
`

const ForceControl = ({ force, increase, decrease }) => {
  return (
    <StyledForceControl>
      <AwsomeButton
        onClick={increase}
        icon="fa-solid fa-caret-up"
        className="small icon"
      />
      <div>{force}</div>
      <AwsomeButton
        onClick={decrease}
        icon="fa-solid fa-caret-down"
        className="small icon"
      />
    </StyledForceControl>
  )
}

export default ForceControl
