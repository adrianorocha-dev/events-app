import { FlatList, Image, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import Ionicons from '@expo/vector-icons/Ionicons';
import colors from "tailwindcss/colors";
import { format } from "date-fns";

import { trpc } from "@shared/services/trpc";

import { Header } from "@shared/components/Header";

export function EventsList() {
  const navigation = useNavigation();

  const { data: highlightedEvents = [] } = trpc.events.listHighlighted.useQuery();

  const { data: allEvents = [] } = trpc.events.listAll.useQuery();

  function handleOpenEvent(eventId: string) {
    navigation.navigate('EventDetails', { eventId })
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 py-4">
        <Header showLogoutButton />

        <View className="flex-row mt-4">
          <View className="flex-row items-center bg-white px-3 py-1 rounded-full">
            <Ionicons name="search" size={20} color={colors.purple[600]} />

            <TextInput
              className="ml-1 text-lg min-w-[200px]"
              placeholder="Buscar eventos"
              cursorColor={colors.purple[600]}
              selectionColor={colors.purple[400] + '55'}
            />
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-xl">
            Eventos em destaque:
          </Text>

          <FlatList
            className="mt-2"
            data={highlightedEvents}
            keyExtractor={item => item.id}
            horizontal
            renderItem={({ item }) => (
              <Pressable
                className="mr-4 border-2 border-purple-600 bg-purple-600 rounded-lg overflow-hidden active:bg-purple-500"
                onPress={() => handleOpenEvent(item.id)}
              >
                <Image
                  source={{ uri: item.cover_img }}
                  className="w-32 h-36"
                />

                <View className="px-2">
                  <Text className="text-zinc-100">{item.name}</Text>

                  <View className="flex-row items-center">
                    <Ionicons name="location" size={20} color={colors.zinc[100]} />
                    <Text className="text-zinc-100">{item.location}</Text>
                  </View>
                </View>
              </Pressable>
            )}
          />
        </View>

        <View className="mt-8">
          <Text className="text-lg font-semibold">
            Todos os eventos:
          </Text>

          <FlatList
            className="mt-2"
            data={allEvents}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Pressable
                className="flex-row bg-purple-100 border border-purple-600 rounded-lg mt-2 active:bg-purple-300"
                onPress={() => handleOpenEvent(item.id)}
              >
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
              </Pressable>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}