import { Text, View } from "react-native";

export function Logo() {
  return (
    <View className="justify-center items-center">
      <Text className="text-5xl font-bold text-purple-600">
        Event
      </Text>
      
      <Text className="text-4xl font-bold">
        Emitter
      </Text>
    </View>
  )
}