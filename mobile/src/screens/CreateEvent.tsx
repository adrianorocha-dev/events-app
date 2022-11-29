import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Header } from '@shared/components/Header';
import { FormControlledInput } from '@shared/components/FormControlledInput';
import { DateTimePicker } from '@shared/components/DateTimePicker';

import { FIELD_REQUIRED, TIME_FORMAT_INVALID } from '@shared/lang/strings';
import { Button } from '@shared/components/Button';
import { trpc } from '@shared/services/trpc';
import { useNavigation } from '@react-navigation/native';

const formSchema = z.object({
  name: z.string({ required_error: FIELD_REQUIRED }).min(1, FIELD_REQUIRED),
  description: z.string().optional(),
  location: z.string({ required_error: FIELD_REQUIRED }).min(1, FIELD_REQUIRED),
  starts_at: z.date({ required_error: FIELD_REQUIRED, invalid_type_error: TIME_FORMAT_INVALID }),
  ends_at: z.date({ required_error: FIELD_REQUIRED, invalid_type_error: TIME_FORMAT_INVALID }),
  schedule: z.array(z.object({
    description: z.string({ required_error: FIELD_REQUIRED }).min(1, FIELD_REQUIRED),
    starts_at: z.date({ required_error: FIELD_REQUIRED, invalid_type_error: TIME_FORMAT_INVALID }),
    ends_at: z.date({ required_error: FIELD_REQUIRED, invalid_type_error: TIME_FORMAT_INVALID }),
  })).optional(),
});

type FieldValues = z.infer<typeof formSchema>;

export function CreateEvent() {
  const navigation = useNavigation();
  
  const { control, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    resolver: zodResolver(formSchema),
  });

  const utils = trpc.useContext();

  const createEventMutation = trpc.events.create.useMutation({
    onError(error) {
      Alert.alert('Erro', error.message);
    },
    onSuccess() {
      utils.events.invalidate();
      navigation.navigate('ManageEvents');
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = ({
    name,
    description,
    location,
    starts_at,
    ends_at,
    schedule
  }) => {
    createEventMutation.mutate({
      name,
      description,
      location,
      starts_at,
      ends_at,
      schedule
    })
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 py-4">
        <Header showBackButton />

        <View className="mt-8">
          <Text className="text-lg font-bold text-purple-600">
            Criar novo evento:
          </Text>
        </View>

        <View className="mt-2">
          <FormControlledInput
            control={control}
            name="name"
            placeholder="Nome do evento"
          />

          <FormControlledInput
            control={control}
            name="description"
            placeholder="Descrição (Opcional)"
            multiline
            numberOfLines={4}
          />

          <FormControlledInput
            control={control}
            name="location"
            placeholder="Local do evento"
          />

          <Controller
            control={control}
            name="starts_at"
            render={({ field: { value, onChange } }) => (
              <DateTimePicker
                value={value}
                onValueChange={onChange}
                placeholder="Data da abertura"
              />
            )}
          />

          <Controller
            control={control}
            name="ends_at"
            render={({ field: { value, onChange } }) => (
              <DateTimePicker
                value={value}
                onValueChange={onChange}
                placeholder="Data do encerramento"
              />
            )}
          />

          <View className="mt-4">
            <Button
              text="Salvar"
              onPress={handleSubmit(onSubmit)}
              isLoading={createEventMutation.isLoading}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}