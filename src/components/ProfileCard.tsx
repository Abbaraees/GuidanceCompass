import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { Tables } from '../types'
import { defaultAvatar } from '../utils'


const ProfileCard = ({id, full_name, qualification, field_of_study, avatar_url}: Tables<'profiles'>) => {
  const router = useRouter()
  return (
    <Pressable onPress={() => router.push(`/counselor/${id}`)}>

      <View style={styles.container}>
        <Image
          source={{uri: avatar_url || defaultAvatar}} 
          style={styles.image}
        />
        <Text style={styles.name}>{full_name}</Text>
        <Text style={styles.qualifications}>{qualification} - {field_of_study}</Text>
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
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600'
  },
  qualifications: {
    fontSize: 15,
    fontStyle: 'italic',
    textAlign: 'center',
  }
})