import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { generateDatesFromYearBeginnings } from '../utils/generate-dates-from-year-beginning'
import { HabitDay } from './HabitDay'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const summaryDates = generateDatesFromYearBeginnings()

const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = Array<{
  id: string;
  date: string;
  amount: number;
  completed: number;
}>
export function SummaryTable() {

  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    api.get('summary').then(response => {
      setSummary(response.data)
      // setSummary([{id: '388929fd-a616-4ff8-91f3-d7e06102f91e', date: '2023-01-02T03:00:00.000Z', completed: 1, amount: 1}])
    })
  }, []);

  return (
    <div className='w-full flex'>
      <div className='grid grid-rows-7 grid-flow-row gap-3'>
        {weekDays.map((weekDay, index) => {
          return (
            <div key={`${weekDay}-${index}`} className='text-zinc-400 text-xl h-10 w-10 font-bold flex items-center justify-center'>
              {weekDay}
            </div>
          )
        })}
      </div>
      <div className='grid grid-rows-7 grid-flow-col gap-3'>
        {summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })
          return  (
            <HabitDay
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
              date={date}
              key={date.toString()
            }/>
          )
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill}).map((_, index) => {
          return (
            <div key={index} className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'></div>
          )
        })}
      </div>
    </div>
  )
}