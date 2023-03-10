import * as CheckBox from '@radix-ui/react-checkbox'
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/axios';

interface HabitlistProps {
  date: Date;
  onCompletedChange: (completed: number) => void 
}

interface HabitsInfo {
  possibleHabits: {
    id: string;
    title: string;
    created_at: string;
  }[],
  completedHabits: string[];
}[]

export function HabitsList({ date, onCompletedChange }: HabitlistProps) {

  const [habitsInfo, setHabitsInfo] = useState<HabitsInfo>()

  useEffect(() => {
    api.get('day', {
      params: {
        date: date.toISOString(),
      }
    })
    .then(response => setHabitsInfo(response.data))
  }, [])

  async function handleToggleHabit(habitId: string) {
    const isHabitAlreadyCompleted = habitsInfo?.completedHabits.includes(habitId)

    await api.patch(`habits/${habitId}/toggle`)

    let completedHabits: string[] = []

    if(isHabitAlreadyCompleted)
    completedHabits = habitsInfo!.completedHabits.filter(id => id !== habitId)
    else
      completedHabits = [...habitsInfo!.completedHabits, habitId]

    setHabitsInfo({
      possibleHabits: habitsInfo!.possibleHabits,
      completedHabits,
    })

    onCompletedChange(completedHabits.length)
  }

  const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

  return (
    <div className='mt-6 flex flex-col gap-3'>
      {habitsInfo?.possibleHabits.map(habit => {
        return (
          <CheckBox.Root
            className='flex items-center gap-3 group'
            key={habit.id}
            checked={habitsInfo.completedHabits.includes(habit.id)}
            disabled={isDateInPast}
            onCheckedChange={() => handleToggleHabit(habit.id)}
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-violet-500 group-data-[state=checked]:border-violet-500 transition-colors group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 focus group-focus:ring-offset-background'>
              <CheckBox.Indicator>
                <Check size={20} className='text-white' />
              </CheckBox.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
              {habit.title}
            </span>
          </CheckBox.Root>
        )
      })}
    </div>
  )
}