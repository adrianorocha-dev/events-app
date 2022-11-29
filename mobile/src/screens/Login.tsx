import { useEffect, useState } from 'react';
import { Alert, BackHandler, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { trpc } from '@shared/services/trpc';

import { saveAuthToken } from '@shared/utils/saveAuthToken';

import { BackButton } from './../shared/components/BackButton';
import { Button, ButtonVariants } from "../shared/components/Button";
import { Logo } from "../shared/components/Logo";
import { FormControlledInput } from '@shared/components/FormControlledInput';

import { FIELD_REQUIRED, INVALID_EMAIL_FORMAT } from '@shared/lang/strings';

enum LoginType {
  PARTICIPANT = 'PARTICIPANT',
  INSTITUTION = 'INSTITUTION',
}

const formSchema = z.object({
  email: z.string({ required_error: FIELD_REQUIRED }).email(INVALID_EMAIL_FORMAT),
  password: z.string({ required_error: FIELD_REQUIRED }).min(1, FIELD_REQUIRED),
});

type FieldValues = z.infer<typeof formSchema>;

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

  const { control, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(formSchema)
  });

  const navigation = useNavigation();

  const loginMutation = trpc.users.login.useMutation({
    onError(error) {
      Alert.alert('Erro', error.message);
    },
    onSuccess({ token }) {
      saveAuthToken(token);
      navigation.navigate('ManageEvents');
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    loginMutation.mutate({
      email,
      password,
    });
  }

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
              <FormControlledInput
                control={control}
                name="email"
                className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
                placeholder="Email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />

              <FormControlledInput
                control={control}
                name="password"
                className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
                placeholder="Senha"
                secureTextEntry
                textContentType="password"
              />

              <View className="mt-3">
                <Button
                  text="Login"
                  onPress={handleSubmit(onSubmit)}
                  isLoading={loginMutation.isLoading}
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