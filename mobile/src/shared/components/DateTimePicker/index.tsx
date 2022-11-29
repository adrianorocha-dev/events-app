import { Pressable, Text } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { useState } from 'react';

interface DateTimePickerProps {
  value?: Date;
  onValueChange?: (newValue: Date) => void;
  placeholder?: string
}

export function DateTimePicker({ value, onValueChange, placeholder = '' }: DateTimePickerProps) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  function handleShowDate() {
    setShowDatePicker(true)
  }

  return (
    <>
      <Pressable
        className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
        onPress={handleShowDate}
      >
        <Text className={`text-lg ${value === undefined ? 'text-zinc-400' : ''}`}>
          {value ? format(value, 'dd/MM/yyyy - HH:mm') : placeholder}
        </Text>
      </Pressable>

      {showDatePicker && (
        <RNDateTimePicker
          value={value ?? new Date()}
          mode="date"
          onChange={(event, date) => {
            if (date) {
              onValueChange?.(date);
              setShowTimePicker(true)
            }
          }}
        />
      )}

      {showTimePicker && (
        <RNDateTimePicker
          value={value ?? new Date()}
          mode="time"
          onChange={(event, date) => {
            if (date) {
              onValueChange?.(date);
            }
          }}
        />
      )}
    </>
  )
}