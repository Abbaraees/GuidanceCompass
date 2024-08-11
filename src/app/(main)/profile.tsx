import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import Colors from '@/src/constants/Colors'
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'
import Button from '@/src/components/Button'
import { useRouter } from 'expo-router'
import supabase from '@/src/libs/supabase'

const ProfileLayout = () => {
  const router = useRouter()
  return (
    <SafeAreaView>
      <Header title='Profile' />
      <View style={styles.body}>
        <View style={styles.profileImageContainer}>

        </View>
        <Image 
          source={{uri: 'https://cdn.pixabay.com/photo/2017/03/27/12/11/boy-2178303_1280.jpg'}}
          style={styles.profileImage}
        />
        <View style={styles.profileSections}>
          <Pressable style={styles.section} onPress={() => router.navigate('/profile-settings/update-profile')}>
            <AntDesign name='user' color={'#5e5e5e'} size={26} />
            <Text style={styles.sectionText}>Profile</Text>
          </Pressable>
          <Pressable style={styles.section} onPress={() => router.navigate('/profile-settings/manage-account')}>
            <MaterialCommunityIcons name='account-box-outline' color={'#5e5e5e'} size={26} />
            <Text style={styles.sectionText}>Manage Account</Text>
          </Pressable>
          <Pressable style={styles.section}>
            <MaterialIcons name='info-outline' color={'#5e5e5e'} size={26} />
            <Text style={styles.sectionText}>About</Text>
          </Pressable>
          <View style={{width: '100%', marginTop: 'auto'}}> 
            <Button title='Logout' onPress={() => {
              supabase.auth.signOut()
              router.navigate('/auth/sign-in')
            }} />
          </View>
        </View>
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 10,
    alignItems: 'center'
  },
  profileImageContainer: {
    width: 320,
    height: 320,
    borderRadius: 175,
    backgroundColor: Colors.light.tint
  },
  profileImage: {
    width: 120,
    height: 120,
    position: 'absolute',
    top: 50,
    borderRadius: 75,
    zIndex: 10
  },
  profileSections: {
    backgroundColor: '#fff',
    width: 320,
    // height: '100%',
    marginTop: -220,
    paddingTop: 80,
    gap: 25
  },
  section: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#5e5e5e',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    gap: 20,
    borderRadius: 5
  },
  sectionText: {
    color: '#5e5e5e',
    fontSize: 16,
    fontWeight: '600'
  }
  
})
export default ProfileLayout