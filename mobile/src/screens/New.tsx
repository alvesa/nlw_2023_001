import { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { BackButton } from '../components/BackButton';
import { CheckBox } from '../components/CheckBox';
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors';
import { api } from '../lib/axios';
import { AxiosError } from 'axios';

const avaliableWeekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export function New() {
  const [title, setTitle] = useState('')
  const [weekDays, setWeekDays] = useState<number[]>([])

  function handleToggleWeekDays(weekDayIndex: number) {
    if(weekDays.includes(weekDayIndex)){
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
    } else {
      setWeekDays(prevState => [...prevState, weekDayIndex])
    }
  }

  async function handleCreateNewHabit() {
    try {
      if(!title.trim() || !weekDays.length)
        Alert.alert('Novo habito', 'Informe o nome do habito e escolha a periodicidade')

      await api.post('/habits', { title, weekDays });

      setTitle('')
      setWeekDays([])

      Alert.alert('Novo habito', 'Habito criado com sucesso')
      
    }
    catch(err) {
      const errorHandler = err as AxiosError
      Alert.alert('Ops', `Nao foi possivel criar o novo habito - ${errorHandler.message}`)
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
          onChangeText={setTitle}
          value={title}
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
          className='w-full h-14 flex-row items-center justify-center bg-violet-600 rounded-md mt-6'
          onPress={handleCreateNewHabit}
        >
          <Feather
            name='check'
            size={20}
            color={colors.white}
          />
          <Text className='font-semibold txt-base text-white ml-2'>Confirmar</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}