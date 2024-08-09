import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../constants/Colors'

type ButtonPropsType = {
  title: string,
  outline?: boolean,
  onPress: () => void
}

const Button = ({title, outline, onPress}: ButtonPropsType) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.light.tint,
    maxWidth: 330,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 8
  },
  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700'
  }
})