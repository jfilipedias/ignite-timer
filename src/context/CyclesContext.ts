import { createContext } from 'react'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesContextData {
  activeCycle: Cycle | undefined
  onFinishCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextData)
