import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

type ResourceCardPropsType = {
  title: string,
  image: string,
  description: string,
  id: number
}

const ResourceCard = ({ title, image, description, id}: ResourceCardPropsType) => {
  const router = useRouter()
  return (
    <Pressable onPress={() => router.navigate(`/(main)/resources/${id}`)}>
      <View style={styles.container}>
        <Image 
          source={{uri: image}} 
          style={styles.image}
        />
        <Text style={styles.title}>{ title }</Text>
        <Text style={styles.description}>{ description }</Text>
      </View>
    </Pressable>
  )
}

export default ResourceCard

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 350,
    borderRadius: 10,
    backgroundColor: '#ddd',
    paddingBottom: 10
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    marginHorizontal: 5
  },
  description: {
    marginHorizontal: 5,
    // letterSpacing: 0.5,
    textAlign: 'justify'
  }
})