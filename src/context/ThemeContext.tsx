import { createContext, ReactNode, useContext, useEffect } from 'react'

import { ThemeType } from '../@types/styled'
import { usePersistedState } from '../hooks/usePersistedState'
import { darkTheme } from '../styles/themes/dark'
import { lightTheme } from '../styles/themes/light'

interface ThemeContextData {
  theme: ThemeType
  toggleTheme: () => void
}

export const ThemeContext = createContext({} as ThemeContextData)

interface ThemeContextProviderProps {
  onThemeChange: (theme: ThemeType) => void
  children: ReactNode
}

export function ThemeContextProvider({
  onThemeChange,
  children,
}: ThemeContextProviderProps) {
  const [theme, setTheme] = usePersistedState<ThemeType>(
    '@ignite-timer:theme',
    darkTheme,
  )

  const toggleTheme = () => {
    setTheme((state) => (state.title === 'light' ? darkTheme : lightTheme))
  }

  useEffect(() => {
    onThemeChange(theme)
  }, [theme, onThemeChange])

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}
