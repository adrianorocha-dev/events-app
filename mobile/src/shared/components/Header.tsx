import { Pressable, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'tailwindcss/colors';
import { useNavigation } from '@react-navigation/native';

interface HeaderProps {
  showBackButton?: boolean;
  showLogoutButton?: boolean;
}

export function Header({ showBackButton, showLogoutButton }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row justify-center items-center relative">
      {showBackButton && (
        <Pressable
          className="absolute left-0 p-1"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={26} />
        </Pressable>
      )}

      <View className="flex-row items-stretch">
        <Text className="text-xl text-purple-600 font-extrabold">Event</Text>
        <Text className="text-xl">Emitter</Text>
      </View>

      {showLogoutButton && (
        <Pressable
          className="absolute right-0 flex-row bg-purple-600 active:bg-purple-500 px-3 py-1 rounded-md items-center"
        >
          <Text className="mr-1 text-lg text-white">Sair</Text>
          <Ionicons name="exit-outline" color={colors.white} size={24} />
        </Pressable>
      )}
    </View>
  )
}