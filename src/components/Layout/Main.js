import styled from 'styled-components'

const StyledMain = styled.main`
  margin: 0 auto;
  padding: 10vh 50px;
  max-width: 1360px;
`
const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>
}

export default Main
