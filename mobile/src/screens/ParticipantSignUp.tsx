import { Alert, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native'

import { Logo } from '../shared/components/Logo';
import { Button } from '../shared/components/Button';
import { DatePicker } from '../shared/components/DatePicker';
import { BackButton } from '../shared/components/BackButton';
import { z } from 'zod';

import { trpc } from '@shared/services/trpc';

import { DATE_FORMAT_INVALID, FIELD_REQUIRED, INVALID_CPF_FORMAT, INVALID_EMAIL_FORMAT, PASSWORDS_DO_NOT_MATCH, PASSWORD_TOO_SHORT } from '@shared/lang/strings';

import { FormControlledInput } from '@shared/components/FormContolledInput';
import { FormControlledMaskedInput } from '@shared/components/FormContolledMaskedInput';

const formSchema = z.object({
  email: z.string({ required_error: FIELD_REQUIRED }).email(INVALID_EMAIL_FORMAT),
  password: z.string({ required_error: FIELD_REQUIRED }).min(8, PASSWORD_TOO_SHORT),
  passwordConfirmation: z.string({ required_error: FIELD_REQUIRED }),
  name: z.string({ required_error: FIELD_REQUIRED }).min(1, FIELD_REQUIRED),
  cpf: z.string({ required_error: FIELD_REQUIRED }).regex(/^(\d{3})\.(\d{3})\.(\d{3})-(\d{2})$/, INVALID_CPF_FORMAT),
  birthday: z.date({ required_error: FIELD_REQUIRED, invalid_type_error: DATE_FORMAT_INVALID }),
});

type FieldValues = z.infer<typeof formSchema>;

export function ParticipantSignUp() {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });

  const createParticipantMutation = trpc.participants.create.useMutation({
    onError(error) {
      Alert.alert('Erro', error.message);
    },
    onSuccess() {
      Alert.alert('Suceso', 'Cadastrado com sucesso.', [
        { style: 'default', onPress: () => navigation.navigate('Login') }
      ]);
    }
  });

  const navigation = useNavigation()

  const onSubmit: SubmitHandler<FieldValues> = ({
    email,
    password,
    passwordConfirmation,
    name,
    cpf,
    birthday,
  }) => {
    const passwordsMatch = password === passwordConfirmation;

    if (!passwordsMatch) {
      setError('passwordConfirmation', { message: PASSWORDS_DO_NOT_MATCH })
      return;
    }

    createParticipantMutation.mutate({
      email,
      password,
      name,
      cpf,
      birthday,
    });
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 p-12 flex-col justify-center">
        <BackButton />

        <Logo />

        <View className="mt-7">
          <FormControlledInput
            control={control}
            name="email"
            placeholder="Email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <FormControlledInput
            control={control}
            name="password"
            placeholder="Senha"
            secureTextEntry
            textContentType="password"
          />

          <FormControlledInput
            control={control}
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
            secureTextEntry
            textContentType="password"
          />

          <FormControlledInput
            control={control}
            name="name"
            placeholder="Nome completo"
            textContentType="name"
          />

          <FormControlledMaskedInput
            control={control}
            name="cpf"
            placeholder="CPF"
            mask="999.999.999-99"
            keyboardType="number-pad"
          />

          <Controller
            control={control}
            name="birthday"
            render={({ field: { value, onChange } }) => (
              <DatePicker
                placeholder="Data de nascimento"
                value={value}
                onValueChange={onChange}
              />
            )}
          />

          {errors.birthday && (
            <Text className="text-red-600">
              {errors.birthday.message}
            </Text>
          )}

          <View className="mt-4">
            <Button
              text="Cadastrar-se"
              onPress={handleSubmit(onSubmit)}
              isLoading={createParticipantMutation.isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}