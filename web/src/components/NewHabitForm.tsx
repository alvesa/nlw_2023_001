import { Check } from 'phosphor-react';
import * as CheckBox from '@radix-ui/react-checkbox'
import { FormEvent, useState } from 'react';
import { api } from '../lib/axios';

const availableWeekDays = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sabado',
]

export function NewHabitForm() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])
  function createNewHabit(event: FormEvent) {
    event.preventDefault();
    if(!title || !weekDays.length)
      return

      api.post('habits', { title, weekDays })
      .then(response => {
        alert('Habito criado com sucesso')
        setTitle('')
        setWeekDays([])
      })
  }

  function handleToggleWeekDay(weekDay: number){
    if(weekDays.includes(weekDay)) {
      const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
      setWeekDays(weekDaysWithRemovedOne)
    } else {
      const weekDaysWithAddedOne = [...weekDays, weekDay]
      setWeekDays(weekDaysWithAddedOne)
    }
  }
  return (
    <form onSubmit={createNewHabit} className='w-full flex flex-col mt-6'>
      <label htmlFor='title' className='font-semibold leading-tight'>
        Qual seu compromentimento?
      </label>
      <input
        onChange={event => setTitle(event.target.value)}
        type='text'
        id='title'
        placeholder='ex.: Exercicios, dormir bem, etc...'
        className='p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-violet-700 focus:ring-offset-2 focus focus:ring-offset-zinc-900'
        autoFocus
        value={title}
      />

      <label htmlFor=''>
        Qual a recorrencia?
      </label>

      <div className='mt-3 flex flex-col gap-2'>
        {availableWeekDays.map((weekDay, index) => (
          <CheckBox.Root
            key={weekDay}
            className='flex items-center gap-3 group'
            checked={weekDays.includes(index)}
            onCheckedChange={() => handleToggleWeekDay(index)}
          >
            <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-violet-500 group-data-[state=checked]:border-violet-500 group-focus:outline-none group-focus:ring-2 group-focus:ring-violet-700 group-focus:ring-offset-2 focus group-focus:ring-offset-zinc-900'>
              <CheckBox.Indicator>
                <Check size={20} className='text-white' />
              </CheckBox.Indicator>
            </div>
            <span className='font-semibold text-xl text-white leading-tight'>
              {weekDay}
            </span>
          </CheckBox.Root>
        ))}
      </div>

      <button type='submit' className='mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-violet-600 hover:bg-violet-500 transition-colors'>
        <Check size={20} weight='bold' />
        Confirmar
      </button>
    </form>
  )
}