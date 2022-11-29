import { ActivityIndicator, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRoute } from "@react-navigation/native";

import { trpc } from "@shared/services/trpc";

import { Header } from "@shared/components/Header";

import colors from "tailwindcss/colors";
import { format } from "date-fns";

export function DetailEvent() {
  const navigation = useNavigation();
  const route = useRoute()

  const { eventId } = route.params;

  const { data, isLoading, error } = trpc.events.detail.useQuery({ id: eventId }, {
    enabled: !!eventId
  })

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 px-5 py-4">
        <Header showBackButton />

        {isLoading && (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color={colors.purple[600]} />
          </View>
        )}

        {error && (
          <View className="flex-1 justify-center items-center">
            <Text className="text-xl text-red-600">
              {error.message}
            </Text>
          </View>
        )}

        {data && (
          <View className="mt-4">
            <Image
              source={{ uri: data?.cover_img }}
              className="w-full h-48"
            />

            <View className="mt-2">
              <Text className="text-2xl font-bold">
                {data?.name}
              </Text>

              <Text className="text-lg">
                {data?.description}
              </Text>

              <Text className="text-lg">
                Local: {data?.location}
              </Text>

              <Text className="text-lg">
                Início em: {format(data.starts_at, 'dd/MM/yyyy HH:mm')}
              </Text>

              <Text className="text-lg">
                Encerramento em: {format(data.ends_at, 'dd/MM/yyyy HH:mm')}
              </Text>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  )
}