import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface BackButtonProps {
  onPress?: () => void;
}

export function BackButton({ onPress }: BackButtonProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    if (onPress) {
      return onPress()
    }

    navigation.goBack()
  }

  return (
    <View className="absolute top-2 left-2">
      <Pressable
        className="p-2 bg-transparent"
        onPress={handleGoBack}
      >
        <Ionicons name="arrow-back" size={32} />
      </Pressable>
    </View>
  );
}
