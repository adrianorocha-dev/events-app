import { Pressable, Text } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

interface DateTimePickerProps {
  value?: Date;
  onValueChange?: (newValue: Date) => void;
  placeholder?: string
}

export function DateTimePicker({ value, onValueChange, placeholder = '' }: DateTimePickerProps) {
  function handleShowDate() {
    DateTimePickerAndroid.open({
      value: value ?? new Date(),
      mode: 'date',
      onChange: (event, date) => {
        if (date) {
          DateTimePickerAndroid.open({
            value: date,
            mode: 'time',
            onChange: (event, date) => {
              if (date) {
                onValueChange?.(date)
              }
            }
          });
        }
      },
    });
  }

  return (
    <Pressable
      className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
      onPress={handleShowDate}
    >
      <Text className={`text-lg ${value === undefined ? 'text-zinc-400' : ''}`}>
        {value ? format(value, 'dd/MM/yyyy - HH:mm') : placeholder}
      </Text>
    </Pressable>
  )
}