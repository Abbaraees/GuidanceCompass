import { View, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router'

const AuthIndex = () => {
  return (
    <Redirect href='/auth/sign-in' />
  )
}

export default AuthIndex