import React, { useState } from 'react';
import { View, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { toast } from '@/lib/toast';
import { uploadVideo } from '@/lib/cloudinary';

interface Props {
    setVideo: (videoUrl?: string) => void;
}

const UploadVideo = ({ setVideo }: Props) => {
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
        <View style={{ marginTop: 12 }}>
            <Button title="Sélectionner une vidéo" onPress={pickVideo} disabled={uploading} />
        </View>
    );
};

export default UploadVideo;
