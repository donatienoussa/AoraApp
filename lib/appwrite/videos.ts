// In this file, I implement the CRUD about videos

import { VideoType } from "@/types";
import { config, databases } from "./config";
import { ID, Query } from "react-native-appwrite";


export const add = async (video:VideoType) => {
    try {
        const response = await databases.createDocument(
            config.databaseId,
            config.videoCollectionId,  
            ID.unique(),
            video
        );
        
        if(response.$id) {
            return {
                success: true, 
                message: 'Vidéo ajouté avec succès'
            }
        }
        else {
            return {
                success: false, 
                message: 'Echec lors de l\'ajout de la vidéo'
            }
        }
    } catch (error) {
        console.log(error); 
        
        return {
            success: false, 
            message: error
        }
    }
}

// Récupérer les dernières vidéos
export async function latestVideos(): Promise<VideoType[]> {

    try {
        const response = await databases.listDocuments<VideoType>(
            config.databaseId,
            config.videoCollectionId,
            [Query.orderDesc("$createdAt"), Query.limit(7)]
        );

        return response.documents

    } catch (error: any) {
        throw new Error(error)
    }
}

