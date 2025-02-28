import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import UploadVideo from '@/components/UploadVideo';
import { SafeAreaView } from 'react-native-safe-area-context';
import VideoPlayer from '@/components/VideoPlayer';
import { VideoSource } from 'expo-video';

export default function Create() {
    const [video, setVideo] = useState<string | undefined>(undefined);
    const [videoSource, setVideoSource] = useState<VideoSource>({
        uri: undefined
    });


    useEffect(() => {
        if (video) {
            setVideoSource({ uri: video });
        }
    }, [video]);
    
    
    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 items-center justify-center p-4">
                <Text className="text-2xl font-bold mb-4">Uploader une vidéo</Text>

                {video ? (
                    <View className="w-full h-64 mb-4">   
                        <VideoPlayer videoSource={videoSource} /> 
                    </View>
                ) : (
                    <View className="w-full h-64 mb-4 bg-gray-200 flex items-center justify-center rounded-xl">
                        <Text className="text-gray-500">Aucune vidéo sélectionnée</Text>
                    </View>
                )}

                <UploadVideo  setVideo={setVideo} />
            </View>
        </SafeAreaView>
    );
}
