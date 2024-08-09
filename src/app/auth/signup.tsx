import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Text } from '@/src/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import { Link } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Let's get you signed up</Text>
        <InputField 
          label='Email'
          placeholder='Enter your email'
          value={email}
          onChange={setEmail}
        />
        <InputField 
          value={password}
          placeholder='Enter your password'
          label='Password' 
          onChange={setPassword}
          secureTextEntry
        />
        <InputField 
          value={password2}
          placeholder='Re-enter your password'
          label='Re-enter Password' 
          onChange={setPassword2}
          secureTextEntry
        />
        <Button title='Login' onPress={() => {}}/>
        <View  style={{marginTop: 60}}>          
          <Text style={{fontSize: 16}}>
            Already have an account? <Link href={'/auth/sign-in'} style={{fontWeight: 'bold'}}>Signup</Link>
          </Text>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
}

const styles =StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    marginTop: 60,
    fontWeight: '600'
  },
  socialLinks: {
    flexDirection: 'row', 
    gap: 15, 
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})
export default Signup