import { useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { TextInputProps } from 'react-native';
import { Text, View } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import colors from 'tailwindcss/colors';

interface FormControlledInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T, any>;
  name: Path<T>;
  mask: string;
  fieldError?: string;
}

export function FormControlledMaskedInput<T extends FieldValues>({ control, name, mask, fieldError, ...props }: FormControlledInputProps<T>) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) =>
          <MaskedTextInput
            mask={mask}
            value={value}
            onChangeText={onChange}
            onBlur={(e) => { setIsFocused(false); onBlur(); }}
            onFocus={() => setIsFocused(true)}
            style={{
              marginTop: 8,
              backgroundColor: '#FFF',
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: 6,
              borderWidth: 1,
              fontSize: 18,
              lineHeight: 28,
              borderColor: isFocused ? 'rgb(147, 51, 234)' : fieldError ? 'rgb(220, 38, 38)' : 'rgb(113, 113, 122)'
            }}
            cursorColor={colors.purple[600]}
            selectionColor={colors.purple[400] + '55'}
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