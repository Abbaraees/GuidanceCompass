import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

type InputFieldPropsType = {
  value: string,
  placeholder?: string,
  label: string,
  secureTextEntry?: boolean
  onChange: (text: string) => void
}

const InputField = ({ value, placeholder, label, secureTextEntry, onChange}: InputFieldPropsType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput 
        value={value}
        placeholder={placeholder}
        onChangeText={onChange}
        style={styles.textInput}
        secureTextEntry={secureTextEntry}
      />
    </View>
  )
}

export default InputField

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 330,
    marginBottom: 18
  },
  label: {
    fontSize: 17,
    marginBottom: 4,
    fontWeight: 'semibold'
  },
  textInput: {
    width: '100%',
    borderColor: '#565656',
    borderWidth: 1,
    borderRadius: 4,
    height: 40,
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 0,

  }
})