import { View, Text, Button, StyleSheet, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import { SafeAreaView } from 'react-native-safe-area-context'
import getUserPosts from '@/lib/appwrite/appwrite'



export default function Profile() {

  const user = useUser()
  const posts:any = []

  useEffect(() => {
    try {
      const posts = getUserPosts(user.current.$id)
      console.log(posts)
    } catch (error) {
      console.log(error)
    }
  })


  return (
    <SafeAreaView style={styles.container}>
      {/* <FlatList
        data={posts}
        renderItem={(item) => (<Text>{item.index}</Text>)}
      /> */}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%'
  }
})