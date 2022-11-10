import { useState } from 'react'
import { HandPalm, Play } from 'phosphor-react'

import { CyclesContext } from '../../context/CyclesContext'
import { Countdown } from './components/Countdown'
// import { NewCycleForm } from './components/NewCycleForm'
import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from './styles'

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  // const taskInputData = watch('task')
  // const isSubmitButtonDisable = !taskInputData

  // function handleCreateNewCycle(data: NewCycleFormData) {
  //   const newCycleId = String(new Date().getTime())
  //   const { minutesAmount, task } = data

  //   const newCycle: Cycle = {
  //     id: newCycleId,
  //     task,
  //     minutesAmount,
  //     startDate: new Date(),
  //   }

  //   setCycles((state) => [...state, newCycle])
  //   setActiveCycleId(newCycleId)
  //   setSecondsAmountPassed(0)

  //   reset()
  // }

  function handleInterruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  function onFinishCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, finishedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  return (
    <HomeContainer>
      <form /* onSubmit={handleSubmit(handleCreateNewCycle)} */>
        <CyclesContext.Provider value={{ activeCycle, onFinishCurrentCycle }}>
          {/* <NewCycleForm /> */}
          <Countdown />
        </CyclesContext.Provider>

        {activeCycle ? (
          <StopCountdownButton type="button" onClick={handleInterruptCycle}>
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton
            type="submit" /* disabled={isSubmitButtonDisable} */
          >
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
