import { Pressable, Text } from "react-native";

export enum ButtonVariants {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

interface ButtonProps {
  text: string
  onPress?: () => void
  variant?: ButtonVariants
  className?: string
}

export function Button({
  text,
  onPress,
  variant = ButtonVariants.PRIMARY,
  className = ''
}: ButtonProps) {
  const variantStyles: Record<ButtonVariants, { button: string, text: string }> = {
    [ButtonVariants.PRIMARY]: {
      button: 'bg-purple-600 active:bg-purple-500',
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
      className={`${variantStyles[variant].button} px-4 py-2 rounded-full`}
    >
      <Text className={`${variantStyles[variant].text} text-xl text-center`}>
        {text}
      </Text>
    </Pressable>
  )
}