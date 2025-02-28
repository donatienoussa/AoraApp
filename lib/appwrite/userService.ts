
import { ID } from "react-native-appwrite";
import { account, avatars, config, databases } from "@/lib/appwrite/config";


// Fonction de connexion
export async function loginService(email: string, password: string) {
    const loggedIn = await account.createEmailPasswordSession(email, password);
    return loggedIn;
}

// Fonction de déconnexion
export async function logoutService() {
    await account.deleteSession("current");
}

// Fonction d'inscription
export async function registerService(email: string, password: string, username: string) {
    //1- Create a new account
    const newAccount = await account.create(ID.unique(), email, password, username);
    const avatarUrl = avatars.getInitials(username);

    //2- Create a new user
    const newUser = await databases.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            username,
            email,
            avatar: avatarUrl,
            password
        }
    );

    return { newAccount, newUser };
}

// Fonction pour vérifier si un utilisateur est déjà connecté
export async function getCurrentUser() {
    return await account.get();
}
