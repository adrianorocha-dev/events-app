import { Control, Controller, FieldValues, Path } from "react-hook-form"
import { TextInputProps } from "react-native";
import { Text, TextInput, View } from "react-native";

interface FormControlledInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T, any>;
  name: Path<T>;
  fieldError?: string;
}

export function FormControlledInput<T extends FieldValues>({ control, name, fieldError, ...props }: FormControlledInputProps<T>) {
  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { name, value, onChange, onBlur } }) =>
          <TextInput
            className={`mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg ${fieldError ? 'border-red-600' : ''}`}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            {...props}
          />
        }
      />

      {fieldError && (
        <Text className="text-red-600">
          {fieldError}
        </Text>
      )}
    </View>
  )
}