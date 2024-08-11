import { Alert, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text, View } from '@/src/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import { Link, useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import signinViewModel from './signinViewModel'
import { observer } from 'mobx-react'

const SignIn = observer(() => {
  const router = useRouter()

 
  useEffect(() => {
    if (signinViewModel.loginError) {
      Alert.alert("Login Failed", signinViewModel.loginMessage)
    }
  }, [signinViewModel.loginError])

  if (signinViewModel.loginSuccess) {
    router.replace('/(main)')
  }

  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Let's get you logged in</Text>
        <InputField 
          label='Email'
          placeholder='Enter your email'
          value={signinViewModel.email}
          onChange={(email) => signinViewModel.setEmail(email)}
        />
        <InputField 
          value={signinViewModel.password}
          placeholder='Enter your password'
          label='Password' 
          onChange={(password) => signinViewModel.setPassword(password)}
          secureTextEntry
        />
        <Button title='Login' onPress={() => signinViewModel.login()} disabled={signinViewModel.isLoading} />
        <View  style={{backgroundColor: '#eee'}}>
          <Text style={{textAlign: 'center', fontSize: 28, marginVertical: 20}}>Or</Text>
          <View style={styles.socialLinks}>
            <AntDesign name='apple1' size={24} color={'#565656'} />
            <AntDesign name='google' size={24} color={'#565656'} />
          </View>
          <Text style={{fontSize: 16}}>
            Don't have an account? <Link href={'/auth/signup'} style={{fontWeight: 'bold'}}>Signup</Link>
          </Text>
        </View>
          
      </SafeAreaView>
    </KeyboardAwareScrollView>
  )
})

const styles =StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
    marginTop: 100,
    fontWeight: '600'
  },
  socialLinks: {
    flexDirection: 'row', 
    gap: 15, 
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20
  }
})
export default SignIn