import { Account, Avatars, Client, Databases } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.donatien.aora',
    projectId: '667c2654002e7b5c2f41',
    databaseId: '667c29d7003794e248fd',
    userCollectionId: '667c2a0e0018d480a607',
    videoCollectionId: '667c2a4400373f4cca47',
    storageId: '667c311700336bf2f018',
};


export const client = new Client()
    .setProject(config.projectId)
    .setEndpoint(config.endpoint)
    .setPlatform(config.platform);


export const account = new Account(client); 
export const avatars = new Avatars(client);
export const databases = new Databases(client);