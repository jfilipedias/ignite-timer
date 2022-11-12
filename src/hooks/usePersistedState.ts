import { useState, useEffect, Dispatch, SetStateAction } from 'react'

type Response<T> = [T, Dispatch<SetStateAction<T>>]

export function usePersistedState<T>(
  storedItemName: string,
  initialState: T,
): Response<T> {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(storedItemName)

    if (storedValue) {
      return JSON.parse(storedValue)
    } else {
      return initialState
    }
  })

  useEffect(() => {
    localStorage.setItem(storedItemName, JSON.stringify(state))
  }, [storedItemName, state])

  return [state, setState]
}
