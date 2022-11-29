import { TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'

import { Logo } from '../shared/components/Logo';
import { Button } from '../shared/components/Button';
import { DatePicker } from '../shared/components/DatePicker';
import { BackButton } from '../shared/components/BackButton';

export function ParticipantSignUp() {
  const navigation = useNavigation()

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-12 flex-col justify-center">
        <BackButton />

        <Logo />

        <View className="mt-7">
          <TextInput
            className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
            placeholder="Email"
          />

          <TextInput
            className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
            placeholder="Senha"
            secureTextEntry
          />

          <TextInput
            className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
            placeholder="Confirme sua senha"
            secureTextEntry
          />

          <TextInput
            className="mt-4 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
            placeholder="Nome completo"
          />

          <TextInput
            className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
            placeholder="CPF"
          />

          <DatePicker
            placeholder="Data de nascimento"
          />

          <View className="mt-4">
            <Button
              text="Cadastrar-se"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}