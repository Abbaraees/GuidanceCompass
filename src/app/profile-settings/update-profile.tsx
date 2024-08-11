import { StatusBar, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '@/src/components/Header'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'

const UpdateProfle = () => {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Header title='Profile' />
      <View style={styles.body}>
      <Image 
          source={{uri: 'https://cdn.pixabay.com/photo/2017/03/27/12/11/boy-2178303_1280.jpg'}}
          style={styles.profileImage}
        />
        <InputField
          label='Name'
        />
        <InputField
          label='Phone Number'
        />
        <InputField
          label='City'
        />
        <InputField
          label='Qualification'
        />
        <InputField
          label='Field of Study'
        />

        <Button title='Save' onPress={() => {}}/>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default UpdateProfle

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  body: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
  },
})