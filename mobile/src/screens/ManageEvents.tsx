import { FlatList, Image, Pressable, RefreshControl, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from 'tailwindcss/colors';
import { format } from 'date-fns';

import { Header } from '@shared/components/Header';

import { trpc } from '@shared/services/trpc';

export function ManageEvents() {
  const { data: events = [], isLoading, isFetching, refetch } = trpc.events.list.useQuery();

  console.log(events)

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

        <FlatList
          className="mt-4"
          data={events}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => <View className='h-2'></View>}
          renderItem={({ item }) => (
            <View className="flex-row bg-purple-100 border border-purple-600 rounded-lg">
              <Image
                source={{ uri: item.cover_img }}
                className="w-20 h-20 rounded-md"
              />

              <View className="ml-3">
                <Text>{item.name}</Text>
                
                <View className="flex-row items-center">
                  <Ionicons name="location" size={16} />
                  <Text>{item.location}</Text>
                </View>
                
                <Text>De: {format(item.starts_at, 'dd/MM/yyyy HH:mm')}</Text>
                
                <Text>Até: {format(item.ends_at, 'dd/MM/yyyy HH:mm')}</Text>
              </View>
            </View>
          )}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={() => refetch()} />
          }
        />
      </View>
    </SafeAreaView>
  )
}