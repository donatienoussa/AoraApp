import { View, Text, Image, StatusBar, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '@/components/CustomButton';
import { useColorScheme } from '@/hooks/useColorScheme';


export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();

  const logo = isDarkMode ? images.logo : images.logoDark;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-black">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="w-full justify-center items-center h-[85vh] px-4">
          <Image
            source={logo}
            className="w-[130] h-[84]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className='w-[380] h-[298]'
            resizeMode="contain"
          />
          <View className="relative mt-5">
            <Text
              className='text-2xl text-center font-pbold dark:text-white'
            >
              Découvrez d'infinies possibilités avec{' '}
              <Text className='text-secondary'>Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136] h-[15] relative right-[-140] bottom-0"
              resizeMode="contain"
            />
          </View>

          <Text className='font-semibold text-center dark:text-white mt-5'
          >
            Application de partage de vidéos créées par l'intelligence artificielle: {'\n'} Embarquez dans une aventure virtuelle fascinante.
          </Text>

          <CustomButton
            title="Continuer avec votre e-mail"
            handlePress={() => router.push('/(auth)/sign-in')}
            containerStyles="w-full mt-7"
            textStyles="text-xl"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
