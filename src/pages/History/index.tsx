import { useContext } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { CyclesContext } from '../../context/CyclesContext'
import { HistoryContainer, HistoryList, Status } from './styles'

export function History() {
  const { cycles } = useContext(CyclesContext)

  function formatDateToString(date: Date) {
    return format(date, "d 'de' LLLL 'às' HH:mm'h'", {
      locale: ptBR,
    })
  }

  function formatDateDistanceToNow(date: Date) {
    return formatDistanceToNow(date, {
      addSuffix: true,
      locale: ptBR,
    })
  }

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>
                  {cycle.minutesAmount}{' '}
                  {cycle.minutesAmount > 1 ? 'minutos' : 'minuto'}
                </td>
                <td>
                  <time
                    title={formatDateToString(new Date(cycle.startDate))}
                    dateTime={new Date(cycle.startDate).toISOString()}
                  >
                    {formatDateDistanceToNow(new Date(cycle.startDate))}
                  </time>
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}

                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}

                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
