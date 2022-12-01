import { ChangeEvent, useContext, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Minus, Plus } from 'phosphor-react'

import {
  FormContainer,
  MinutesAmountContainer,
  MinutesAmountInput,
  TaskInput,
} from './styles'
import { CyclesContext } from '../../../../context/CyclesContext'

const MIN_MINUTES_AMOUNT = 1
const MAX_MINUTES_AMOUNT = 60

export function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  const { register, watch, setValue } = useFormContext()

  const minutesAmountInputValue = watch('minutesAmount')

  const isDecrementButtonDisabled =
    minutesAmountInputValue <= MIN_MINUTES_AMOUNT
  const isIncrementButtonDisabled =
    minutesAmountInputValue >= MAX_MINUTES_AMOUNT

  useEffect(() => {
    register('minutesAmount')
  }, [register])

  function handleMinutesAmountDecrement() {
    setValue('minutesAmount', minutesAmountInputValue - 1)
  }

  function handleMinutesAmountIncrement() {
    setValue('minutesAmount', minutesAmountInputValue + 1)
  }

  function handleMinutesAmountChange(event: ChangeEvent<HTMLInputElement>) {
    const newMinutesAmount = event.target.value
      ? parseInt(event.target.value, 10)
      : 0

    const isNewMinutesAmountValid =
      newMinutesAmount >= MIN_MINUTES_AMOUNT &&
      newMinutesAmount <= MAX_MINUTES_AMOUNT

    if (isNewMinutesAmountValid || newMinutesAmount === 0) {
      setValue('minutesAmount', newMinutesAmount)
    }
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
        <button
          type="button"
          onClick={handleMinutesAmountDecrement}
          disabled={isDecrementButtonDisabled}
        >
          <Minus size={16} />
        </button>

        <MinutesAmountInput
          id="minutesAmount"
          type="number"
          placeholder="0,"
          disabled={!!activeCycle}
          value={minutesAmountInputValue.toString()}
          onChange={handleMinutesAmountChange}
        />

        <button
          type="button"
          onClick={handleMinutesAmountIncrement}
          disabled={isIncrementButtonDisabled}
        >
          <Plus size={16} />
        </button>
      </MinutesAmountContainer>

      <span>minutos.</span>
    </FormContainer>
  )
}
