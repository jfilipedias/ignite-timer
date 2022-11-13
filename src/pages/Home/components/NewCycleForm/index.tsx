import { ChangeEvent, useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Minus, Plus } from 'phosphor-react'

import { CyclesContext } from '../../../../context/CyclesContext'
import {
  FormContainer,
  MinutesAmountContainer,
  MinutesAmountInput,
  TaskInput,
} from './styles'

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register, watch, setValue } = useFormContext()

  const minutesAmountValue = watch('minutesAmount')

  useEffect(() => {
    register('minutesAmount', { max: 60, min: 1 })
  }, [register])

  function handleMinutesAmountDecrease() {
    setValue('minutesAmount', minutesAmountValue - 1, { shouldValidate: true })
  }

  function handleMinutesAmountIncrease() {
    setValue('minutesAmount', minutesAmountValue + 1, { shouldValidate: true })
  }

  function handleMinutesAmountChange(event: ChangeEvent<HTMLInputElement>) {
    setValue('minutesAmount', event.target.value, { shouldValidate: true })
  }

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        placeholder="Dê um nome para a sua tarefa"
        disabled={!!activeCycle}
        {...register('task')}
      />

      <label htmlFor="minutesAmount">durante</label>
      <MinutesAmountContainer>
        <button type="button" onClick={handleMinutesAmountDecrease}>
          <Minus size={16} />
        </button>

        <MinutesAmountInput
          id="minutesAmount"
          type="number"
          placeholder="00"
          disabled={!!activeCycle}
          value={minutesAmountValue}
          onChange={handleMinutesAmountChange}
        />

        <button type="button" onClick={handleMinutesAmountIncrease}>
          <Plus size={16} />
        </button>
      </MinutesAmountContainer>

      <span>minutos.</span>
    </FormContainer>
  )
}
