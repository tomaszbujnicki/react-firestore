import styled from 'styled-components'

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 18px;
  width: 400px;
  margin-bottom: 20px;

  input {
    font-size: 18px;
    padding: 15px 10px;
    margin-top: 10px;
    border-radius: 8px;
    border: 1px solid black;
    outline: none;
    border-color: ${(props) =>
      props.empty ? 'black' : props.invalid ? 'red' : 'lightgreen'};
  }
`

const Input = ({ label, isValid, input }) => {
  return (
    <StyledInput invalid={!isValid} empty={!input.value}>
      <label htmlFor={input.id}>{label}</label>
      <input {...input} />
    </StyledInput>
  )
}

export default Input
