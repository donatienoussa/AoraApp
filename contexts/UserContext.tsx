import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { toast } from "../lib/toast";
import { useRouter } from "expo-router";
import { loginService, logoutService, registerService, getCurrentUser } from "@/lib/appwrite/userService";
import { UserType } from "@/types";

interface UserContextType {
    current: any | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, username: string) => Promise<void>;
    isLoading: boolean;
}

// Création du contexte utilisateur
const UserContext = createContext<UserContextType | undefined>(undefined);

// Hook personnalisé pour accéder au contexte utilisateur
export function useUser() {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

interface UserProviderProps {
    children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
    const [user, setUser] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const router = useRouter();

    // Fonction de connexion
    const login = useCallback(async (email: string, password: string): Promise<void> => {
        try {
            const loggedInUser = await loginService(email, password);
            setUser(loggedInUser);
            toast('Bienvenue. Vous êtes connecté.');
            router.replace('/(tabs)/home');
        } catch (error) {
            toast("Impossible de se connecter. Vérifiez l'email ou le mot de passe.");
            //console.error("Login Error: ", error);
        }
    }, [router]);

    // Fonction de déconnexion
    const logout = useCallback(async (): Promise<void> => {
        try {
            await logoutService();
            setUser(null);
            toast('Vous êtes déconnecté.');
            router.replace('/');
        } catch (error) {
            toast('Impossible de se déconnecter.');
            //console.error("Logout Error: ", error);
        }
    }, [router]);

    // Fonction d'inscription
    const register = useCallback(async (email: string, password: string, username: string): Promise<void> => {
        try {
            await registerService(email, password, username);
            toast('Votre compte a été créé.');
            await login(email, password); // Connexion après inscription
        } catch (error) {
            toast("Impossible de créer un compte. Réessayez.");
            //console.error("Register Error: ", error);
        }
    }, [login]);

    // Fonction d'initialisation de l'utilisateur au chargement du composant
    const init = useCallback(async (): Promise<void> => {
        try {
            const loggedInUser = await getCurrentUser();
            setUser(loggedInUser);
            toast('Heureux de vous revoir.');
            router.replace('/(tabs)/home');
        } catch (error) {
            setUser(null); // Si l'utilisateur n'est pas connecté
        } finally {
            setIsLoading(false);
        }
    }, [router]);

    // Initialisation de l'utilisateur
    useEffect(() => {
        init();
    }, [init]);

    return (
        <UserContext.Provider value={{ current: user, login, logout, register, isLoading }}>
            {children}
        </UserContext.Provider>
    );
}