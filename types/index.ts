import { Models } from "react-native-appwrite";

// Définition du type Video qui étend Document
export interface VideoType extends Models.Document {
    thumbnail: string;
    title: string;
    video: string;
    prompt: string;
    creator: {username:string, avatar:string};
}


export interface UserType extends Models.Document {
    username: string; 
    email: string;
    avatar: string;
    accountId: string; 
    password: string;
} 