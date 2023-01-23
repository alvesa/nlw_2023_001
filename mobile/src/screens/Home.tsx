import { Text, View, ScrollView, Alert } from 'react-native';
import { DAY_SIZE, HabitDay } from '../components/HabitDay';
import { Header } from '../components/Header';
import { useNavigation } from '@react-navigation/native'

import { generateDatesFromYearBeginnings } from '../utils/generate-dates-from-year-beginning'
import { api } from '../lib/axios'
import { useEffect, useState } from 'react';
import { Loading } from '../components/Loading';
import dayjs from 'dayjs';


const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
const datesFromYearStart = generateDatesFromYearBeginnings()
const minimumSummaryDatesSizes = 18 * 5;
const amountOfDaysToFill = minimumSummaryDatesSizes - datesFromYearStart.length

type SummaryProps = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}

export function Home() {
  const { navigate } = useNavigation()
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<SummaryProps[] | null >(null)

  async function fetchData() {
    try {
      setLoading(true)
      const { data } = await api.get('/summary')

      setSummary(data)
    } catch (error) {
      Alert.alert('Ops', 'Nao foi possivel carregar o sumario de habitos')
      console.log(error)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if(loading) { // TODO
    return (
      <Loading />
    )
  }

  return (
    <View className='flex-1 bg-background px-8 py-16'>
      <Header />
      <View className='flex-row mt-6 mb-2'>
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className='text-zinc-400 text-xl font-bold text-center mx-1'
            style={{ width: DAY_SIZE }}
            >
            {weekDay}
          </Text>
        ))}
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {summary &&
          <View className='flex-row flex-wrap'>
            {
              datesFromYearStart.map(date => {
                const dayWithHabits = summary.find(day => {
                  return dayjs(date).isSame(day.date, 'day')
                })
                return (
                <HabitDay
                  date={date}
                  amountOfHabits={dayWithHabits?.amount}
                  amountCompleted={dayWithHabits?.completed}
                  key={date.toISOString()}
                  onPress={() => navigate('habit', { date: date.toISOString() })}
                />
                )
              })
            }
            {
              amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill })
              .map((_, index) => (
                <View
                  key={index}
                  className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40'
                  style={{ width: DAY_SIZE, height: DAY_SIZE }}
                />
              ))
            }
          </View>
        }
      </ScrollView>
    </View>
  )
}