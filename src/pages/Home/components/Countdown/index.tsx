import { useContext, useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

import { CyclesContext } from '../../../../context/CyclesContext'
import { CountdownContainer, Separator } from './styles'

export function Countdown() {
  const { activeCycle, onFinishCurrentCycle } = useContext(CyclesContext)

  const [secondsAmountPassed, setSecondsAmountPassed] = useState(0)

  const secondsAmount = activeCycle ? activeCycle.minutesAmount * 60 : 0
  const secondsLeft = activeCycle ? secondsAmount - secondsAmountPassed : 0

  const currentMinutes = Math.floor(secondsLeft / 60)
  const currentSeconds = secondsLeft % 60

  const formattedMinutes = String(currentMinutes).padStart(2, '0')
  const formattedSeconds = String(currentSeconds).padStart(2, '0')

  useEffect(() => {
    let activeCycleInterval: number

    if (activeCycle) {
      activeCycleInterval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= secondsAmount) {
          onFinishCurrentCycle()

          setSecondsAmountPassed(secondsAmount)

          clearInterval(activeCycleInterval)
        } else {
          setSecondsAmountPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(activeCycleInterval)
    }
  }, [activeCycle, secondsAmount, onFinishCurrentCycle])

  useEffect(() => {
    if (activeCycle) {
      document.title = `${formattedMinutes}:${formattedSeconds}`
    }
  }, [formattedMinutes, formattedSeconds, activeCycle])

  return (
    <CountdownContainer>
      <span>{formattedMinutes[0]}</span>
      <span>{formattedMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{formattedSeconds[0]}</span>
      <span>{formattedSeconds[1]}</span>
    </CountdownContainer>
  )
}
