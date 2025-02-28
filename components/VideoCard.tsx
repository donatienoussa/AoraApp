import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useRef, useState } from 'react';
import { icons } from '../constants';
import { Models } from 'react-native-appwrite';
import VideoPlayer from './VideoPlayer';

const VideoCard = ({ item }: { item: Models.Document }) => {
    const [play, setPlay] = useState(false);
    const video = useRef(null);

    console.log(item);

    return (
        <View className="flex flex-col items-center px-4 mb-14">
            {/* Header */}
            <View className="flex-row gap-3 items-start w-full">
                {/* Avatar & Info */}
                <View className="flex-row items-center flex-1">
                    <View className="w-11 h-11 rounded-lg border border-gray-400 justify-center items-center p-0.5">
                        <Image source={{ uri: item.avatar }} className="w-full h-full rounded-lg" resizeMode="cover" />
                    </View>

                    <View className="ml-3 flex-1">
                        <Text className="font-semibold dark:text-white" numberOfLines={1}>
                            {item.title}
                        </Text>
                        <Text className="text-gray-400 text-xs font-normal">{item.username}</Text>
                    </View>
                </View>

                {/* Menu Icon */}
                <View className="pt-2">
                    <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
                </View>
            </View>

            {/* Video / Thumbnail */}
            {play ? (
                <VideoPlayer videoUri={item.videoUri} />
            ) : (
                <TouchableOpacity activeOpacity={0.7} onPress={() => setPlay(true)} className="w-full h-60 rounded-2xl mt-3 justify-center items-center relative">
                    <Image source={{ uri: item.thumbnail }} className="w-full h-full rounded-2xl" resizeMode="cover" />
                    <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default VideoCard;
