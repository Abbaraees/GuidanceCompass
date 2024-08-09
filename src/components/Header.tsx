import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'
import { AntDesign } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const Header = ({ title }: {title: string}) => {
  const router = useRouter()
  return (
    <View style={styles.container}>
      <Pressable onPress={router.back}>
        <AntDesign name='arrowleft' color='#fff' size={24} /> 
      </Pressable>
      <Text style={styles.title}>{title}</Text>
      <View></View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    backgroundColor: Colors.light.tint,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'semibold',
  }
})