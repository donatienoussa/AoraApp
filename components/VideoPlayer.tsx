import { useEvent } from 'expo';
import { useVideoPlayer, VideoSource, VideoView } from 'expo-video';
import { StyleSheet, View, Button } from 'react-native';

// const videoSource =
//     'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

interface Props {
    videoSource: VideoSource
}


export default function VideoPlayer({ videoSource }: Props) {
    const player = useVideoPlayer(videoSource, player => {
        player.loop = true;
        player.play();
    });

    const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });

    return (
        <View className="relative">
            <VideoView
                style={{ width: 350, height: 275 }}
                player={player} allowsFullscreen allowsPictureInPicture
            />
        </View>
    );
}