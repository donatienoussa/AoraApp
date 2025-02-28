import React, { useState } from "react";
import { useRouter, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { icons } from "../constants";

const SearchInput = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [query, setQuery] = useState("");

    const handleSearch = () => {
        const trimmedQuery = query.trim();

        if (!trimmedQuery) {
            Alert.alert("Requête manquante", "Veuillez entrer quelque chose à rechercher.");
            return;
        }

        if (pathname.startsWith("/search")) {
            router.setParams({ query: trimmedQuery });
        } else {
            router.push(`/search/${trimmedQuery}`);
        }
    };

    return (
        <View className="flex-row items-center justify-between w-full h-16 px-4 dark:bg-black border-2 border-[#2d2d2d] dark:border-gray-700 rounded-xl">
            <TextInput
                className="flex-1 text-lg text-white dark:text-gray-200 mr-2"
                value={query}
                placeholder="Rechercher une vidéo"
                placeholderTextColor="#000"
                onChangeText={setQuery}
                keyboardType="default"
            />
            <TouchableOpacity onPress={handleSearch}>
                <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
            </TouchableOpacity>
        </View>
    );
};

export default SearchInput;
