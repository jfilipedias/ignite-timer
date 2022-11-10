import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { Router } from './Router'
import { CyclesContextProvider } from './context/CyclesContext'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CyclesContextProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CyclesContextProvider>

      <GlobalStyle />
    </ThemeProvider>
  )
}
