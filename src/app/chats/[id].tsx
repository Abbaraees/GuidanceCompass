import { KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View, StatusBar, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import Header from '@/src/components/Header'
import { Ionicons } from '@expo/vector-icons'
import { useHeaderHeight } from '@react-navigation/elements'
import supabase from '@/src/libs/supabase'
import Colors from '@/src/constants/Colors'
import { useAuth } from '@/src/providers/AuthProvider'

const chat = () => {
  const flatlist = useRef<FlatList>(null)
  const { id } = useLocalSearchParams()
  const height = useHeaderHeight()
  const [messages, setMessages] = useState<any[] | null>()
  const [message, setMessage] = useState('')
  const { profile } = useAuth()

  const chatId = typeof id == 'string' ? parseInt(id) : parseInt(id[0])
  const [user1Id, setUser1Id] = useState('')
  const [user2Id, setUser2Id] = useState('') 

  const sendMessage = async () => {
    const {data, error} = await supabase
      .from('chat_messages')
      .insert({
        message: message,
        sender_id: profile?.id === user1Id ? user1Id : user2Id,
        receiver_id: profile?.id !== user1Id ? user1Id : user2Id,
        chat_id: chatId
      })
      .select()

    if (!error) {
      fetchMessages()
      setMessage('')
    } else {
      Alert.alert('Failed to send message', error.message)
    }
  }

  const fetchMessages = async () => {
    const {data, error} = await supabase
      .from('chats')
      .select(`
        chat_messages (
          receiver_id,
          sender_id,
          sender:sender_id(full_name),
          *
        )  
      `)
      .eq('id', chatId)
      .single()

    if (!error) {
      setMessages(data.chat_messages)
      flatlist?.current?.scrollToEnd({animated: false})
      if (!user1Id && !user2Id) {
        setUser1Id(data.chat_messages[0].sender_id)
        setUser2Id(data.chat_messages[0].receiver_id)
      }
    } else {
      setMessages(null)
    }
  }

  useEffect(() => {
    fetchMessages()
    flatlist.current?.scrollToEnd()
  }, [id])

  return (
    <KeyboardAvoidingView style={styles.container} behavior='padding' keyboardVerticalOffset={height + StatusBar?.currentHeight}>

        <Header title='Message to Counselor'/>
        <View style={styles.body}>
        {
          messages === undefined
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size='large' color={Colors.light.tint} />  
            </View>
          : messages  === null
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>An Error Occured Try again later!</Text>  
            </View>
          : messages.length  === 0
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>No Resource Added Yet</Text>  
            </View>
          : <View style={styles.messages}>
              <FlatList
                ref={flatlist}
                data={messages}
                renderItem={({item, index}) => (
                  <View key={index} style={[styles.message, {marginLeft: item.sender_id == profile?.id ? 'auto' : 0}]}>
                    <Text style={styles.messageSender}>
                      {item.sender_id == profile?.id ? 'Me:' : `${item.sender.full_name}:`}
                    </Text>
                    <Text>{item.message}</Text>
                  </View>
                )}
                onContentSizeChange={() => {
                  flatlist?.current?.scrollToEnd({animated: false})
                  console.log("Size changed")
                }}
                contentContainerStyle={{paddingTop: 40}}
                extraData={messages}
                
              />
              
            </View>
        }

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