import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'tailwindcss/colors';

import { Header } from '@shared/components/Header';

export function ManageEvents() {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 py-4">
        <Header showLogoutButton />

        <View className="mt-8 flex-row justify-between">
          <Text className="text-xl font-bold">
            Meus Eventos:
          </Text>

          <Pressable
            className="bg-purple-600 active:bg-purple-500 px-3 py-1 rounded-md flex-row items-center"
            onPress={() => navigation.navigate('CreateEvent')}
          >
            <Text className="text-white text-lg mr-1">Add Evento</Text>
            <Ionicons name="add" color={colors.white} size={24} />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}