import React, { useState } from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { toast } from '@/lib/toast';
import { uploadVideo } from '@/lib/cloudinary';
import { icons } from '@/constants';
import VideoPlayer from './VideoPlayer';
import { VideoSource } from 'expo-video';
import CustomButton from './CustomButton';

interface Props {
    video?: string,
    setVideo: (videoUrl?: string) => void;
    videoSource: VideoSource    
}

const UploadVideo = ({ video, setVideo, videoSource }: Props) => {
    const [uploading, setUploading] = useState(false);
    const [mediaPermission, requestMediaPermission] = ImagePicker.useMediaLibraryPermissions();

    const pickVideo = async () => {
        // Vérifie et demande la permission d'accéder à la galerie
        if (!mediaPermission?.granted) {
            const permissionResponse = await requestMediaPermission();
            if (!permissionResponse.granted) {
                toast("Permission refusée. Vous devez autoriser l'accès à la galerie pour uploader une vidéo.");
                return;
            }
        }

        // Ouvre le sélecteur de médias pour choisir une vidéo
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets && result.assets.length > 0) {
            const videoUri = result.assets[0].uri;
            console.log("URI DE LA VIDEO",videoUri);
            // Appelle la fonction uploadVideo définie précédemment
            await uploadVideo(videoUri, setUploading, setVideo);

            //Send video informations to Appwrite
            
        } else {
            toast("Aucune vidéo sélectionnée.");
        }
    };


    return (
        video ? (
            <View className="w-full  mb-4" >
                <VideoPlayer videoSource={videoSource} />
                <CustomButton
                    title="Modifier la video" 
                    handlePress={pickVideo}
                    isLoading={uploading}
                />
            </View >
        ) : (
            <TouchableOpacity className="w-full mt-4 h-[250px] flex items-center justify-center border-2 
         border-gray-400 rounded-lg" onPress={pickVideo}>
                <View className="border-2 border-style-dotted border-gray-400 rounded-lg">
                    <Image
                        source={icons.upload}
                        className="w-16 h-16" resizeMode="contain"
                    />
                </View>
            </TouchableOpacity>
        )
    )
};

export default UploadVideo;
