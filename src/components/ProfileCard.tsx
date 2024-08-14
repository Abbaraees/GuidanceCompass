import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

type ProfileCardPropsType = {
  id: string | null, 
  full_name: string | null, 
  qualification: string | null, 
  field_of_study: string | null
}

const ProfileCard = ({id, full_name, qualification, field_of_study}: ProfileCardPropsType) => {
  const router = useRouter()
  return (
    <Pressable onPress={() => router.push(`/counselor/${id}`)}>

      <View style={styles.container}>
        <Image
          source={{uri: 'https://cdn.pixabay.com/photo/2018/05/16/15/13/businessman-3406030_960_720.jpg'}} 
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