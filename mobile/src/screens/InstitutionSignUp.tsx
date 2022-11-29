import { Alert, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { trpc } from '@shared/services/trpc';

import { FIELD_REQUIRED, INSTITUTION_NAME_REQUIRED, INVALID_CNPJ_FORMAT, INVALID_EMAIL_FORMAT, PASSWORDS_DO_NOT_MATCH, PASSWORD_TOO_SHORT } from '@shared/lang/strings';

import { Logo } from '../shared/components/Logo';
import { Button } from '../shared/components/Button';
import { BackButton } from '../shared/components/BackButton';
import { FormControlledInput } from '@shared/components/FormControlledInput';
import { FormControlledMaskedInput } from '@shared/components/FormControlledMaskedInput';

const formSchema = z.object({
  email: z.string({ required_error: FIELD_REQUIRED }).email(INVALID_EMAIL_FORMAT),
  password: z.string({ required_error: FIELD_REQUIRED }).min(8, PASSWORD_TOO_SHORT),
  passwordConfirmation: z.string({ required_error: FIELD_REQUIRED }),
  name: z.string({ required_error: FIELD_REQUIRED }).min(1, INSTITUTION_NAME_REQUIRED),
  cnpj: z.string({ required_error: FIELD_REQUIRED }).regex(/^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})$/, INVALID_CNPJ_FORMAT),
});

type FieldValues = z.infer<typeof formSchema>;

export function InstitutionSignUp() {
  const { control, handleSubmit, formState: { errors }, setError } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });

  const createInstitutionMutation = trpc.institutions.create.useMutation({
    onError(error) {
      Alert.alert('Erro', error.message);
    },
    onSuccess() {
      Alert.alert('Suceso', 'Cadastrado com sucesso.', [
        {style: 'default', onPress: () => navigation.navigate('Login')}
      ]);
    }
  });

  const navigation = useNavigation()

  const onSubmit: SubmitHandler<FieldValues> = ({
    email,
    password,
    passwordConfirmation,
    name,
    cnpj,
  }) => {
    const passwordsMatch = password === passwordConfirmation;

    if (!passwordsMatch) {
      setError('passwordConfirmation', {message: PASSWORDS_DO_NOT_MATCH})
      return;
    }

    createInstitutionMutation.mutate({
      email,
      password,
      cnpj,
      name,
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
            fieldError={errors.email?.message}
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <FormControlledInput
            control={control}
            name="password"
            placeholder="Senha"
            fieldError={errors.password?.message}
            secureTextEntry
            textContentType="password"
          />

          <FormControlledInput
            control={control}
            name="passwordConfirmation"
            placeholder="Confirme sua senha"
            fieldError={errors.passwordConfirmation?.message}
            secureTextEntry
            textContentType="password"
          />

          <FormControlledInput
            control={control}
            name="name"
            placeholder="Nome da instituição"
            fieldError={errors.name?.message}
          />

          <FormControlledMaskedInput
            control={control}
            name="cnpj"
            mask="99.999.999/9999-99"
            placeholder="CNPJ"
            fieldError={errors.cnpj?.message}
            keyboardType="number-pad"
          />

          <View className="mt-4">
            <Button
              text="Cadastrar-se"
              onPress={handleSubmit(onSubmit)}
              isLoading={createInstitutionMutation.isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}