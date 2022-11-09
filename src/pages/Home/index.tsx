import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { differenceInSeconds } from 'date-fns'
import { Play } from 'phosphor-react'
import * as zod from 'zod'

import { zodResolver } from '@hookform/resolvers/zod'

import {
  CountdownContainer,
  FormContainer,
  HomeContainer,
  MinutesAmountInput,
  Separator,
  StatCountdownButton,
  TaskInput,
} from './styles'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(1, 'O ciclo precisa ser de no mínimo 1 minuto')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const task = watch('task')
  const isSubmitButtonDisable = !task

  function handleCreateNewCycle(data: NewCycleFormData) {
    const newCycleId = String(new Date().getTime())
    const { minutesAmount, task } = data

    const newCycle: Cycle = {
      id: newCycleId,
      task,
      minutesAmount,
      startDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(newCycleId)
    setSecondsAmountPassed(0)

    reset()
  }

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const secondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const secondsLeft = activeCycle ? secondsAmount - secondsAmountPassed : 0

  const currentMinutes = Math.floor(secondsLeft / 60)
  const currentSeconds = secondsAmount % 60

  const formattedMinutes = String(currentMinutes).padStart(2, '0')
  const formattedSeconds = String(currentSeconds).padStart(2, '0')

  useEffect(() => {
    let activeCycleInterval: number

    if (activeCycle) {
      activeCycleInterval = setInterval(() => {
        setSecondsAmountPassed(
          differenceInSeconds(new Date(), activeCycle.startDate),
        )
      }, 1000)
    }

    return () => {
      clearInterval(activeCycleInterval)
    }
  }, [activeCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${formattedMinutes}:${formattedSeconds}`
    }
  }, [formattedMinutes, formattedSeconds, activeCycle])

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput
            id="task"
            placeholder="Dê um nome para a sua tarefa"
            {...register('task')}
          />

          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            id="minutesAmount"
            type="number"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>{formattedMinutes[0]}</span>
          <span>{formattedMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{formattedSeconds[0]}</span>
          <span>{formattedSeconds[1]}</span>
        </CountdownContainer>

        <StatCountdownButton type="submit" disabled={!isSubmitButtonDisable}>
          <Play size={24} />
          Começar
        </StatCountdownButton>
      </form>
    </HomeContainer>
  )
}
