import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { BackButton } from '../components/BackButton';
import { CheckBox } from '../components/CheckBox';
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';

const avaliableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function New() {
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDays(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }
  return (
    <View className='flex-1 bg-background px-8 pt-16'>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className='mt-6 text-white font-extrabold text-3xl'>
          Criar Hábito
        </Text>
        <Text className='mt-6 text-white font-semibold text-base'>
          Qual seu compromentimento?
        </Text>
        <TextInput
          className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-violet-600'
          placeholder='Exercicios, dormir bem, etc...'
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className='font-semibold mt-4 mb-3 text-white'>
          Qual a recorrencia?
        </Text>
        {avaliableWeekDays.map((weekDay, index) => (
          <CheckBox 
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDays(index)}
          />
        ))}
        <TouchableOpacity
          activeOpacity={0.7}
          className='w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6'
        >
          <Feather
            name='check'
            size={20}
            color={colors.white}
          />
          <Text className='font-semibold txt-base text-white ml-2'></Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}