import { createContext, useState, useEffect } from 'react'

const ThemeContext = createContext({})

export default ThemeContext

const defaultTheme = {
  chart: {
    background: '#abcdef',
  },
}

export const ThemeContextProvider = (props) => {
  const [chart, setChart] = useState({})

  useEffect(() => {
    const chart = defaultTheme.chart
    const background = localStorage.getItem('chart-background')
    setChart({
      background: background || chart.background,
    })
  }, [])

  const changeChart = (name, value) => {
    localStorage.setItem(`chart-${name}`, value)
    setChart((state) => ({
      ...state,
      [name]: value,
    }))
  }

  return (
    <ThemeContext.Provider
      value={{
        chart,
        changeChart,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  )
}
