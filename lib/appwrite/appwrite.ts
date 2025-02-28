import { Query } from "react-native-appwrite"
import { config, databases } from "./config"

//Get the videos posts that matches the query 
export const searchPostsVideos = async (query:string) => {

    try {
        const response = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId,
            [Query.equal('title', query)]
        )

        if (!response) return new Error('Post exist not') 
        
        return response.documents 
    } catch (error:any){
        throw new Error(error.message) 
    }
}


export default async function getUserPosts(userId:string) {
    try {
        const result = await databases.listDocuments(
            config.databaseId,
            config.videoCollectionId, 
            [
                Query.equal('creator', userId)
            ]
        )
        console.log(result.documents)
        return result.documents

    } catch (error:any) {
        throw new Error(error.message)
    }
}