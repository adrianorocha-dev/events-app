import { Pressable, Text } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

interface DatePickerProps {
  value?: Date;
  onValueChange?: (newValue: Date) => void;
  placeholder?: string
}

export function DatePicker({ value, onValueChange, placeholder }: DatePickerProps) {
  function handleShow() {
    DateTimePickerAndroid.open({
      value: value ?? new Date(),
      onChange: (event, date) => date && onValueChange?.(date),
      mode: 'date',
    });
  }

  return (
    <Pressable
      className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
      onPress={handleShow}
    >
      <Text className={`text-lg ${value === undefined ? 'text-zinc-400' : ''}`}>
        {value?.toLocaleDateString() ?? placeholder ?? ''}
      </Text>
    </Pressable>
  )
}