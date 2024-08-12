import { Alert, Pressable, StatusBar, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Text } from '@/src/components/Themed'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import { Link, router } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { observer } from 'mobx-react'
import Checkbox from 'expo-checkbox'
import Colors from '@/src/constants/Colors'
import SignupViewModel from './signupViewModel'
import { useAuth } from '@/src/providers/AuthProvider'
import api from '@/src/api'
import supabase from '@/src/libs/supabase'

const Signup = observer(() => {
  const [signupViewModel, setsignupViewModel] = useState<SignupViewModel>(new SignupViewModel())
  const { fetchSession } = useAuth()


  useEffect(() => { (async () => {
    if (signupViewModel.signupError) {
      Alert.alert("Signup Failed", signupViewModel.signupMessage)
    }

    else if (signupViewModel.signupSuccess) {
      const result = await api.login(signupViewModel.email, signupViewModel.password)
      if (result.success) {
        fetchSession()
        router.replace('/profile-settings/update-profile?mode=new')
      }
      
    }
  })()
  }, [signupViewModel.signupError, signupViewModel.signupSuccess])
  

  return (
    <KeyboardAwareScrollView style={{marginTop: StatusBar.currentHeight}}>
      <View style={styles.container}>
        <Text style={styles.title}>Let's get you signed up</Text>
        <InputField 
          label='Email'
          placeholder='Enter your email'
          value={signupViewModel.email}
          onChange={(email) => signupViewModel.setEmail(email)}
        />

        <View style={styles.roles}>
          <Text style={{fontSize: 17, fontWeight: 'semibold'}}>Select your role</Text>
          <Pressable style={styles.role} onPress={() => signupViewModel.setRole('student')}>
            <Checkbox
              value={signupViewModel.role == 'student'} 
              onChange={() => signupViewModel.setRole('student')}
              color={Colors.light.tint}
            />
            <Text style={styles.roleText}>Student</Text>
          </Pressable>

          <Pressable style={styles.role} onPress={() => signupViewModel.setRole('professional')}>
            <Checkbox
              value={signupViewModel.role == 'professional'} 
              onChange={() => signupViewModel.setRole('professional')}
              color={Colors.light.tint}
            />
            <Text style={styles.roleText}>Professional</Text>
          </Pressable>

          <Pressable style={styles.role} onPress={() => signupViewModel.setRole('counselor')}>
            <Checkbox
              value={signupViewModel.role == 'counselor'} 
              onChange={() => signupViewModel.setRole('counselor')}
              color={Colors.light.tint}
            />
            <Text style={styles.roleText}>Counselor</Text>
          </Pressable>
        </View>
        
        <InputField 
          value={signupViewModel.password}
          placeholder='Enter your password'
          label='Password' 
          onChange={(password) => signupViewModel.setPassword(password)}
          secureTextEntry
        />
        <InputField 
          value={signupViewModel.password2}
          placeholder='Re-enter your password'
          label='Re-enter Password' 
          onChange={(password2) => signupViewModel.setPassword2(password2)}
          secureTextEntry
        />
        <Button title='Signup' onPress={() => signupViewModel.signup() } disabled={signupViewModel.isLoading}/>
        <View  style={{marginTop: 30}}>          
          <Text style={{fontSize: 16}}>
            Already have an account? <Link href={'/auth/sign-in'} style={{fontWeight: 'bold'}}>Login</Link>
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  )
})

const styles =StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    marginTop: 10,
    fontWeight: '600'
  },
  roles: {
    width: 330
  },
  role: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 5,
    alignItems: 'center'
  },
  roleText: {
    fontSize: 16
  }
})

export default Signup