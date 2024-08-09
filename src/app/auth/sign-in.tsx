import { StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Text, View } from '@/src/components/Themed'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import { Link, useRouter } from 'expo-router'
import { AntDesign } from '@expo/vector-icons'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  return (
    <KeyboardAwareScrollView>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Let's get you logged in</Text>
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
        <Button title='Login' onPress={() => {router.replace('/(main)')}}/>
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