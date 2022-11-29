import { Pressable, Text } from "react-native";
import RNDateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useState } from "react";

interface DatePickerProps {
  value?: Date;
  onValueChange?: (newValue: Date) => void;
  placeholder?: string
}

export function DatePicker({ value, onValueChange, placeholder }: DatePickerProps) {
  const [show, setShow] = useState(false);

  function handleChangeDate(event: DateTimePickerEvent, date: Date | undefined) {
    if (date) {
      onValueChange?.(date)
    }

    setShow(false)
  }

  return (
    <>
      <Pressable
        className="mt-2 bg-white px-3 py-2 rounded-md border border-zinc-500 focus:border-purple-600 text-lg"
        onPress={() => setShow(true)}
      >
        <Text className={`text-lg ${value === undefined ? 'text-zinc-400' : ''}`}>
          {value?.toLocaleDateString() ?? placeholder ?? ''}
        </Text>
      </Pressable>

      {show && (
        <RNDateTimePicker
          value={value ?? new Date()}
          mode="date"
          onChange={handleChangeDate}
        />
      )}
    </>
  )
}