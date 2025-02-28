import { View, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants';
import { ThemedText } from './ThemedText';
import { useColorScheme } from '@/hooks/useColorScheme.web';


type FormFieldProps = {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (e: string) => void;
    otherStyles?: string;
    keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
};

export default function FormField({
    title,
    value,
    placeholder,
    handleChangeText,
    otherStyles = "",
    keyboardType,
    ...props
}: FormFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <View className={`mb-2 ${otherStyles}`}>
            <ThemedText
                lightColor="black"
                darkColor="white"
                className="text-base font-medium mb-1"
            >
                {title} :
            </ThemedText>

            <View className="flex-row items-center w-full h-12 border-2 rounded-lg px-4 border-red-400 bg-transparent dark:border-gray-600 ">
                <TextInput
                    className="flex-1 text-base font-semibold dark:text-white"
                    value={value}
                    onChangeText={handleChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    secureTextEntry={title === 'Mot de passe' && !showPassword}
                    keyboardType={keyboardType}
                    {...props}
                />

                {title === 'Mot de passe' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image
                            source={!showPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
}
