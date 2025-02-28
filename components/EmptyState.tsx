import { View, Text, Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './CustomButton'
import { router } from 'expo-router'

type EmptyStateProps = {
    title: string,
    subtitle: string
}

const EmptyState = ({ title, subtitle }: EmptyStateProps) => {
    return (
        <View className="flex items-center justify-center px-4">
            <Image source={images.empty} className="w-[270px] h-[215px]" resizeMode="contain" />

            <Text className="text-xl font-semibold text-white dark:text-gray-200 text-center mt-2">
                {title}
            </Text>
            <Text className="text-sm font-medium text-gray-100 dark:text-gray-400 text-center">
                {subtitle}
            </Text>

            <CustomButton
                title="Créer une vidéo"
                handlePress={() => router.push('/create')}
                containerStyles="w-full my-5"
            />
        </View>
    )
}

export default EmptyState;
