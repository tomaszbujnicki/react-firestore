import styled from 'styled-components'

const StyledChart = styled.div`
  display: flex;
  gap: 1%;
  justify-content: center;
  align-items: flex-end;
  border: 1px solid black;
  padding: 0 20px;
  width: 100%;
  height: 400px;
  background: ${({ background }) => background};
`

const Chart = ({ children, background }) => {
  return (
    <StyledChart columnCount={children.length} background={background}>
      {children}
    </StyledChart>
  )
}

export default Chart
