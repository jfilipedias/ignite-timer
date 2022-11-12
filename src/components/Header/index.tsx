import { NavLink } from 'react-router-dom'
import { Timer, Scroll, Moon, Sun } from 'phosphor-react'

import { HeaderContainer } from './styles'
import Logo from '../../assets/logo.svg'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

export function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext)

  return (
    <HeaderContainer>
      <div>
        <img src={Logo} alt="" />
        <button title="Mudar o tema" onClick={toggleTheme}>
          {theme.title === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </button>
      </div>

      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>

        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
