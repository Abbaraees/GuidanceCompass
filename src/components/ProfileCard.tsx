import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const ProfileCard = () => {
  const router = useRouter()
  return (
    <Pressable onPress={() => router.navigate('/counselor/1')}>

      <View style={styles.container}>
        <Image
          source={{uri: 'https://cdn.pixabay.com/photo/2018/05/16/15/13/businessman-3406030_960_720.jpg'}} 
          style={styles.image}
        />
        <Text style={styles.name}>Mr Robot</Text>
        <Text style={styles.qualifications}>Bsc. Computer Science</Text>
      </View>
    </Pressable>
  )
}

export default ProfileCard

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'

  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  qualifications: {
    fontSize: 15,
    fontStyle: 'italic',
  }
})