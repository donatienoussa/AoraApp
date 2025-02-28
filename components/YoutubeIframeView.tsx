// import React from 'react';
// import { WebView } from 'react-native-webview';
// import { StyleSheet, View, Dimensions } from 'react-native';

// const { width } = Dimensions.get('window');

// const YouTubePlayer = ({ videoId }:{videoId:string}) => {
//     const youtubeUrl = `https://www.youtube.com/embed/${videoId}`;

//     return (
//         <View style={styles.container}>
//             <WebView
//                 style={styles.webview}
//                 javaScriptEnabled={true}
//                 domStorageEnabled={true}
//                 source={{ uri: youtubeUrl }}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     webview: {
//         width: width * 0.9,
//         height: (width * 0.9) * 9 / 16, // Aspect ratio 16:9
//     },
// });

// export default YouTubePlayer;
