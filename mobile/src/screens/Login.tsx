import { useEffect, useState } from 'react';
import { BackHandler, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

import { BackButton } from './../shared/components/BackButton';
import { Button, ButtonVariants } from "../shared/components/Button";
import { Logo } from "../shared/components/Logo";

enum LoginType {
  PARTICIPANT = 'PARTICIPANT',
  INSTITUTION = 'INSTITUTION',
}

export function Login() {
  const [loginType, setLoginType] = useState<LoginType>();

  useEffect(() => {
    function handleGoBack() {
      setLoginType(undefined);
      return true;
    }

    BackHandler.addEventListener('hardwareBackPress', handleGoBack);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleGoBack);
    }
  }, []);

  const navigation = useNavigation();

  function handleGoToSignUp() {
    if (!loginType) {
      return
    }


    const signUpPages: Record<LoginType, keyof ReactNavigation.RootParamList> = {
      [LoginType.PARTICIPANT]: 'ParticipantSignUp',
      [LoginType.INSTITUTION]: 'InstitutionSignUp'
    };

    navigation.navigate(signUpPages[loginType])
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-12 flex-col justify-center">
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
            <BackButton onPress={() => setLoginType(undefined)} />

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
                  onPress={handleGoToSignUp}
                />
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  )
}