import {
  createContext,
  useState,
  ReactNode,
  useReducer,
  useEffect,
} from 'react'
import { differenceInSeconds } from 'date-fns'

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

const STORED_CYCLES_STATE_NAME = '@timer:cycles-state-1.0.0'

const defaultCyclesState = {
  cycles: [],
  activeCycleId: null,
}

function loadCyclesStateFromLocalStorage() {
  const storedCyclesStateJSON = localStorage.getItem(STORED_CYCLES_STATE_NAME)

  if (storedCyclesStateJSON) {
    return JSON.parse(storedCyclesStateJSON)
  }

  return defaultCyclesState
}

interface CyclesContextProviderProps {
  children: ReactNode
}

export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(
    cyclesStateReducer,
    defaultCyclesState,
    loadCyclesStateFromLocalStorage,
  )

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
    }

    return 0
  })

  useEffect(() => {
    const cyclesStateJSON = JSON.stringify(cyclesState)

    localStorage.setItem(STORED_CYCLES_STATE_NAME, cyclesStateJSON)
  }, [cyclesState])

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
