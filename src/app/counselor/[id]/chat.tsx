import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, StatusBar, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Header from '@/src/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'

const chat = () => {
  const flatlist = useRef<FlatList>(null)
  const { id } = useLocalSearchParams()
  const height = useHeaderHeight()
  const [messages, setMessages] = useState<string[]>([])
  const [message, setMessage] = useState('')

  const sendMessage = () => {
    setMessages(prev => [...prev, message])
    setMessage('')
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={height + StatusBar?.currentHeight}>

        <Header title='Message to Counselor'/>
        <View style={styles.body}>
          <View style={styles.messages}>
            <FlatList
              ref={flatlist}
              data={messages}
              renderItem={({item, index}) => (
                <View style={[styles.message, {marginLeft: index % 2 == 0 ? 'auto' : 0}]}>
                  <Text style={styles.messageSender}>{index % 2 == 0 ? 'Me' : 'Counselor'}</Text>
                  <Text>{item}</Text>
                </View>
              )}
              onContentSizeChange={() => flatlist?.current?.scrollToEnd({animated: false})}
            />
            
          </View>

          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.textInput} 
              value={message}
              onChangeText={setMessage}
            />
            <Pressable onPress={sendMessage}>
              <Ionicons name='send-outline' color='#000' size={30} />
            </Pressable>
          </View>
        </View>
    </KeyboardAvoidingView>
  )
}

export default chat

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  body: {
    padding: 10,
    width: '100%',
    height: '91%',
    justifyContent: 'flex-end',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 20
  },
  textInput: {
    width: '90%',
    height: 35,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    paddingHorizontal: 10
  },
  messages: {
  },
  message: {
    backgroundColor: '#dedede',
    width: 300,
    padding: 10,
    borderRadius: 10,
    marginVertical: 10
  },
  messageSender: {
    fontWeight: 'bold',
    marginBottom: 5
  }
})