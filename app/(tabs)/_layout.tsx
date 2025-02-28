import React from 'react'
import { Tabs } from 'expo-router';
import { TabBarIcon } from '@/components/ui/TabBarIcon';
//import { VideosProvider } from '@/contexts/VideoContext';


export default function TabLayout() {

    return (
        
            <Tabs>
                <Tabs.Screen
                    name='home'
                    options={{
                        title: 'Accueil',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name='bookmark'
                    options={{
                        title: 'Bookmark',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'bookmarks' : 'bookmarks-outline'} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name='create'
                    options={{
                        title: 'Créer',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'create' : 'create-outline'} color={color} />
                        )
                    }}
                />

                <Tabs.Screen
                    name='profile'
                    options={{
                        title: 'Profil',
                        headerShown: false,
                        tabBarIcon: ({ color, focused }) => (
                            <TabBarIcon name={focused ? 'person' : 'person-sharp'} color={color} />
                        )
                    }}
                />
            </Tabs>
        

    )
}