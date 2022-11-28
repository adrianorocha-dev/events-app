import { useEffect, useState } from "react";
import { BackHandler, Pressable, SafeAreaView, TextInput, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'

import { Button, ButtonVariants } from "../shared/components/Button";
import { Logo } from "../shared/components/Logo";

enum LoginType {
  PARTICIPANT,
  INSTITUTION
}

export function Login() {
  const [loginType, setLoginType] = useState<LoginType>()

  useEffect(() => {
    function handleGoBack() {
      setLoginType(undefined)
      return true
    }

    BackHandler.addEventListener('hardwareBackPress', handleGoBack)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack)
    }
  }, [])

  return (
    <SafeAreaView className="flex-1 p-12 flex-col justify-center">
      <Logo />

      {loginType === undefined ? (
        <View className="mt-7">
          <View>
            <Button
              text="Sou participante"
              onPress={() => setLoginType(LoginType.PARTICIPANT)}
            />
          </View>

          <View className="mt-4">
            <Button
              text="Sou uma instituição"
              variant={ButtonVariants.SECONDARY}
              onPress={() => setLoginType(LoginType.INSTITUTION)}
            />
          </View>
        </View>
      ) : (
        <>
          <View className="absolute top-10 left-2">
            <Pressable
              className="p-2 bg-transparent"
              onPress={() => setLoginType(undefined)}
            >
              <Ionicons name="arrow-back" size={32} />
            </Pressable>
          </View>

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

            <View className="mt-3">
              <Button
                text="Login"
              />
            </View>

            <View className="mt-3">
              <Button
                text="Cadastrar-se"
                variant={ButtonVariants.SECONDARY}
              />
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  )
}