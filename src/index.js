import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { AuthContextProvider } from './store/AuthContext'
import { DataContextProvider } from './store/DataContext'
import { ThemeContextProvider } from './store/ThemeContext'
import { ModalContextProvider } from './store/ModalContext'

ReactDOM.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <ModalContextProvider>
        <DataContextProvider>
          <AuthContextProvider>
            <App />
          </AuthContextProvider>
        </DataContextProvider>
      </ModalContextProvider>
    </ThemeContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
