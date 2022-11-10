import { createContext, useState, ReactNode, useReducer } from 'react'

import { Cycle, cyclesStateReducer } from '../reducers/cyclesState/reducer'
import {
  createCycleAction,
  finishCurrentCycleAction,
  interruptCurrentCycleAction,
} from '../reducers/cyclesState/actions'

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
interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesStateReducer, {
    cycles: [],
    activeCycleId: null,
  })

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

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
