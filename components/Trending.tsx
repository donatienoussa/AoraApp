import { icons } from '@/constants';
import { Models } from 'react-native-appwrite';
import React, { useRef, useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import VideoPlayer from './VideoPlayer';

interface TrendingItemProps {
  activeItemId: string | undefined;
  item: Models.Document;
}

interface TrendingProps {
  posts: Models.Document[];
}

// Composant TrendingItem qui utilise react-native-reanimated
const TrendingItem = ({ activeItemId, item }: TrendingItemProps) => {
  const [play, setPlay] = useState<boolean>(false);
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withTiming(activeItemId === item.$id ? 1 : 0.9, { duration: 500 });
  }, [activeItemId]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View className="mr-5" style={animatedStyle}>
      {play ? (
        <VideoPlayer videoUri={item.videoUri} />
      ) : (
        <TouchableOpacity className="justify-center items-center" activeOpacity={0.7} onPress={() => setPlay(true)}>
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-[200px] h-[300px] rounded-3xl mt-5 overflow-hidden shadow-lg"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

// Composant Trending qui affiche la liste des vidéos tendances
const Trending = ({ posts }: TrendingProps) => {
  const [activeItemId, setActiveItemId] = useState<string | undefined>();

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => <TrendingItem activeItemId={activeItemId} item={item} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      getItemLayout={(data, index) => ({ length: 220, offset: 220 * index, index })}
      onScroll={(e) => {
        const scrollOffsetX = e.nativeEvent.contentOffset.x;
        const activeIndex = Math.floor(scrollOffsetX / 220);
        setActiveItemId(posts[activeIndex]?.$id);
      }}
    />
  );
};

export default Trending;