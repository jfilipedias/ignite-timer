import { produce } from 'immer'

import { ActionTypes } from './actions'

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesStateReducer(state: CyclesState, action: any) {
  if (action.type === ActionTypes.CREATE_NEW_CYCLE) {
    return produce(state, (draft) => {
      draft.cycles.push(action.payload.newCycle)
      draft.activeCycleId = action.payload.newCycle.id
    })
  }

  if (action.type === ActionTypes.INTERRUPT_CURRENT_CYCLE) {
    const currentCycleIndex = state.cycles.findIndex(
      (cycle) => cycle.id === state.activeCycleId,
    )

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, (draft) => {
      draft.cycles[currentCycleIndex].interruptedDate = new Date()
      draft.activeCycleId = null
    })
  }

  if (action.type === ActionTypes.FINISH_CURRENT_CYCLE) {
    const currentCycleIndex = state.cycles.findIndex(
      (cycle) => cycle.id === state.activeCycleId,
    )

    if (currentCycleIndex < 0) {
      return state
    }

    return produce(state, (draft) => {
      draft.cycles[currentCycleIndex].finishedDate = new Date()
      draft.activeCycleId = null
    })
  }

  return state
}
