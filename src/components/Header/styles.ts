import styled from 'styled-components'

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      width: 3rem;
      height: 3rem;
      background: transparent;
      border: 0;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      color: ${(props) => props.theme.colors['gray-100']};
      cursor: pointer;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme.colors['green-500']};
      }
    }
  }

  nav {
    display: flex;
    gap: 0.5rem;

    a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 3rem;
      height: 3rem;
      color: ${(props) => props.theme.colors['gray-100']};
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;

      &:hover {
        border-bottom: 3px solid ${(props) => props.theme.colors['green-500']};
      }

      &.active {
        color: ${(props) => props.theme.colors['green-500']};
      }
    }
  }
`
