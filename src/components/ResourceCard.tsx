import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

type ResourceCardPropsType = {
  title: string | null,
  image: string | null,
  description: string | null,
  id: number
}

const ResourceCard = ({ title, image, description, id}: ResourceCardPropsType) => {
  const router = useRouter()
  return (
    <Pressable onPress={() => router.push(`/(main)/resources/${id}`)}>
      <View style={styles.container}>
        <Image 
          source={{uri: image ? image : ''}} 
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
    width: '95%',
    minWidth: 350,
    borderRadius: 10,
    backgroundColor: '#ddd',
    paddingBottom: 10,
    marginHorizontal: 'auto'
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 5
  },
  title: {
    fontSize: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    fontWeight: 'semibold',
    paddingHorizontal: 5
  },
  description: {
    marginHorizontal: 5,
    // letterSpacing: 0.5,
    lineHeight: 20,
    fontSize: 16,
    textAlign: 'justify',
    paddingHorizontal: 5
  }
})