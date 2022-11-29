import { ActivityIndicator, Pressable, Text } from "react-native";
import colors from 'tailwindcss/colors';

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface ButtonProps {
  text: string;
  onPress?: () => void;
  variant?: ButtonVariants;
  isLoading?: boolean;
}

export function Button({
  text,
  onPress,
  variant = ButtonVariants.PRIMARY,
  isLoading = false,
}: ButtonProps) {
  const variantStyles: Record<ButtonVariants, { button: string, text: string }> = {
    [ButtonVariants.PRIMARY]: {
      button: `bg-purple-600 active:bg-purple-500`,
      text: 'text-white'
    },
    [ButtonVariants.SECONDARY]: {
      button: 'bg-white border border-purple-600 active:border-purple-500 active:bg-purple-100',
      text: 'text-purple-600'
    }
  }

  return (
    <Pressable
      onPress={onPress}
      className={`${variantStyles[variant].button} px-4 py-2 rounded-full flex-row justify-center ${isLoading ? 'opacity-70' : 'opacity-100'}`}
      disabled={isLoading}
    >
      {isLoading && (
        <ActivityIndicator size="small" color={colors.white} className="mr-2" />
      )}

      <Text className={`${variantStyles[variant].text} text-xl text-center`}>
        {text}
      </Text>
    </Pressable>
  )
}