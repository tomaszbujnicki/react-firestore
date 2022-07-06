import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
  name: '',
})

export default AuthContext

export const AuthContextProvider = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [name, setName] = useState('')

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn')
    const name = localStorage.getItem('name')
    if (storedIsLoggedIn === '1') {
      setIsLoggedIn(true)
      setName(name)
    }
  }, [])

  const loginHandler = ({ name, password }) => {
    // authentication...
    localStorage.setItem('name', name)
    localStorage.setItem('isLoggedIn', '1')
    setName(name)
    setIsLoggedIn(true)
  }

  const logoutHandler = () => {
    localStorage.removeItem('name')
    localStorage.removeItem('isLoggedIn')
    setName('')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider
      value={{
        name,
        isLoggedIn,
        onLogout: logoutHandler,
        onLogin: loginHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
