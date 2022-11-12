import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { ThemeType } from './@types/styled'
import { Router } from './Router'
import { CyclesContextProvider } from './context/CyclesContext'
import { GlobalStyle } from './styles/global'
import { ThemeContextProvider } from './context/ThemeContext'
import { darkTheme } from './styles/themes/dark'

export function App() {
  const [theme, setTheme] = useState(darkTheme)

  function changeTheme(theme: ThemeType) {
    setTheme(theme)
  }

  return (
    <ThemeProvider theme={theme}>
      <ThemeContextProvider onThemeChange={changeTheme}>
        <CyclesContextProvider>
          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </CyclesContextProvider>
      </ThemeContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
