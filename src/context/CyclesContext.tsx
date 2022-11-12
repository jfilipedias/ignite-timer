import { createContext, useState, ReactNode, useReducer } from 'react'
import { differenceInSeconds } from 'date-fns'

import {
  Cycle,
  CyclesState,
  cyclesStateReducer,
} from '../reducers/cyclesState/reducer'
import {
  createCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cyclesState/actions'
import { usePersistedState } from '../hooks/usePersistedState'

interface NewCycleData {
  task: string
  minutesAmount: number
}

interface CyclesContextData {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  secondsAmountPassed: number
  createNewCycle: (data: NewCycleData) => void
  interruptCurrentCycle: () => void
  finishCurrentCycle: () => void
  setSecondsPassed: (seconds: number) => void
}

export const CyclesContext = createContext({} as CyclesContextData)

const defaultCyclesState = {
  cycles: [],
  activeCycleId: null,
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [storedCycles, setStoredCycles] = usePersistedState<CyclesState>(
    '@ignite-timer:cycles-state-1.0.0',
    defaultCyclesState,
  )

  const [cyclesState, dispatch] = useReducer(
    cyclesStateReducer,
    defaultCyclesState,
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  function resetPageTitle() {
    document.title = 'Timer'
  }

  function setSecondsPassed(seconds: number) {
    setSecondsAmountPassed(seconds)
  }

  function createNewCycle(data: NewCycleData) {
    const newCycleId = String(new Date().getTime())
    const { minutesAmount, task } = data

    const newCycle: Cycle = {
      id: newCycleId,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    dispatch(createCycleAction(newCycle))
    setSecondsAmountPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch(interruptCurrentCycleAction())
    resetPageTitle()
  }

  function finishCurrentCycle() {
    dispatch(finishCurrentCycleAction())
    resetPageTitle()
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        secondsAmountPassed,
        createNewCycle,
        interruptCurrentCycle,
        finishCurrentCycle,
        setSecondsPassed,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}
