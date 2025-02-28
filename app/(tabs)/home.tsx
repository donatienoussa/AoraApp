import { View, Text, ScrollView, FlatList, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { latestVideos } from '@/lib/appwrite/videos'
import VideoCard from '@/components/VideoCard'
import { VideoType } from '@/types'
import { images } from '@/constants'
import SearchInput from '@/components/SearchInput'
import Trending from '@/components/Trending'
import { useUser } from '@/contexts/UserContext'
import EmptyState from '@/components/EmptyState'

const Home = () => {

  const [value, setValue] = useState('');
  const [videos, setVideos] = useState<VideoType[]>([]);
  const user = useUser();
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    const fetchVideos = async () => {
      const videos = await latestVideos();
      setVideos(videos);
    };
    fetchVideos();
    setLoading(false);
  }, []);

  const renderLoading = () => (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );

  const renderEmptyState = () => (
    <EmptyState
      title="Pas de vidéos trouvées"
      subtitle="Soyez la première personne à créer une vidéo."
    />
  );

  if (loading) return renderLoading();
  
  return (
    <SafeAreaView>
      <FlatList 
        data={videos}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) =>
          <VideoCard item={item} />
        }
        ListHeaderComponent={() => (
          <View className="mt-12 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm dark:text-white">
                  Content de vous revoir
                </Text>
                <Text className="text-2xl font-psemibold dark:text-white">
                  {user.current.name}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            
            
            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8 mt-10">
              <Text className="text-2xl font-bold mb-3 dark:text-white">
                Dernières vidéos
              </Text>
              <Trending posts={videos} />
            </View>
          </View>
        )}
        ListEmptyComponent={renderEmptyState}    
      />
    </SafeAreaView>
  )
}

export default Home