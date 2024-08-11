import { StatusBar, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '@/src/components/Header'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'

const ManageAccount = () => {
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Header title='Account Setting' />
      <View style={styles.body}>
        <InputField
          label='Email'
        />
        <InputField
          label='Old Password'
        />
        <InputField
          label='New Password'
        />
        <InputField
          label='Repeat New Password'
        />
        <View style={{marginTop: 30, width: '100%'}}>

          <Button title='Save' onPress={() => {}}/>   
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  body: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  }
})

export default ManageAccount
