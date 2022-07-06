import { useContext } from 'react'
import Login from './components/Pages/Login'
import Home from './components/Pages/Home'
import Header from './components/Layout/Header'
import Main from './components/Layout/Main'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import AuthContext from './store/AuthContext'
import GlobalModal from './components/GlobalModal/GlobalModal'

library.add(fas)

function App() {
  const authCtx = useContext(AuthContext)

  return (
    <>
      <Header />
      <Main>{authCtx.isLoggedIn ? <Home /> : <Login />}</Main>
      <GlobalModal />
    </>
  )
}

export default App
