import styled from 'styled-components'

export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  color: ${(props) => props.theme.colors['gray-100']};
  font-size: 1.125rem;
  font-weight: bold;
`
const BaseInput = styled.input`
  height: 2.5rem;
  padding: 0 0.5rem;
  border: 0;
  background: transparent;
  color: ${(props) => props.theme.colors['gray-100']};
  font-weight: bold;
  font-size: 1.125rem;

  &:placeholder {
    color: ${(props) => props.theme.colors['gray-500']};
  }
`

export const TaskInput = styled(BaseInput)`
  flex: 1;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.colors['gray-500']};

  &:focus {
    box-shadow: none;
    border-color: ${(props) => props.theme.colors['green-500']};
  }
`

export const MinutesAmountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-bottom: 2px solid ${(props) => props.theme.colors['gray-500']};
  color: ${(props) => props.theme.colors['gray-100']};

  &:focus-within {
    box-shadow: none;
    border-color: ${(props) => props.theme.colors['green-500']};
  }

  button {
    display: flex;
    align-items: center;
    background: transparent;
    border: 0;
    color: ${(props) => props.theme.colors['gray-500']};
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors['green-500']};
    }

    &:focus {
      box-shadow: none;
    }
  }
`

export const MinutesAmountInput = styled(BaseInput)`
  width: 3rem;
  border: 0;
  text-align: center;

  &:focus {
    box-shadow: none;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }
`
