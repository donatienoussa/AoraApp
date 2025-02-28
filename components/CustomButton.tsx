import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme.web';

type CustomButtonProps = {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
};

export default function CustomButton({
  title,
  handlePress,
  containerStyles = "",
  textStyles = "",
  isLoading = false
}: CustomButtonProps) {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <TouchableOpacity
      className={`flex items-center justify-center rounded-xl min-h-[62px] px-4 py-3
        bg-yellow-400 ${isLoading ? 'opacity-50' : ''} ${containerStyles}`}
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={isDarkMode ? "#fff" : "#000"} />
      ) : (
          <Text
            className={`text-black dark:text-white text-base font-medium ${textStyles}`}
          >
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
