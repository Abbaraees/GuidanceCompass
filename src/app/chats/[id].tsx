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
  const { id, mode, userId } = useLocalSearchParams()
  const height = useHeaderHeight()
  const [messages, setMessages] = useState<any[] | null>()
  const [message, setMessage] = useState('')
  const { profile } = useAuth()

  const [chatId, setChatId] = useState<number>(
    typeof id == 'string' ? parseInt(id) : parseInt(id[0])
  )

  const [existing, setExisting] = useState(false) 
  const [user1Id, setUser1Id] = useState('')
  const [user2Id, setUser2Id] = useState('') 

  const sendMessage = async () => {
    if (chatId) {
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
    else {
      const id = await createNewChat()
      if (id) {
        const {data, error} = await supabase
          .from('chat_messages')
          .insert({
            message: message,
            sender_id: profile?.id ,
            receiver_id: typeof userId == 'string' ? userId : userId[0],
            chat_id: id
          })
          .select()
    
        if (!error) {
          fetchMessages()
          setMessage('')
        } else {
          Alert.alert('Failed to send message', error.message)
        }
      }
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
      if (!user1Id && !user2Id) {
        setUser1Id(data.chat_messages[0].sender_id)
        setUser2Id(data.chat_messages[0].receiver_id)
      }
    } else {
      setMessages(null)
      console.log(error)
    }
  }

  const createNewChat = async () => {
    const {data: chat, error} = await supabase
      .from('chats')
      .insert({})
      .select()
      .single()

    if (!error) {
      const { data, error} = await supabase
        .from('user_chats')
        .insert(
          [
            {user_id: profile?.id, chat_id: chat.id}, 
            {user_id: userId, chat_id: chat.id}
          ]
        )
      
      if (!error) {
        setChatId(chat.id)
      }

      return new Promise<number>(resolve => {
        resolve(chat.id)
      })
    }
    else {
      console.log("Error", error.message)
    }
  }

  useEffect(() => {(async () => {
    if (mode == 'existing') {
      setExisting(true)
      fetchMessages()
    }
    else {
      const {data: currentUserChats, error} = await supabase
        .from('profiles')
        .select(`
          chats (
            *
          )  
        `)
        .eq('id', profile?.id)
    
      const {data: otherUserChats, error: error2} = await supabase
        .from('profiles')
        .select(`
          chats (
            *
          )  
        `)
        .eq('id', userId)


      if (currentUserChats && otherUserChats){
        for (let c of currentUserChats[0].chats) {
          let commonChat = otherUserChats[0].chats.find(other => other.id == c.id)
          if (commonChat) {
            setChatId(commonChat.id)
            break
          }
        }
      }

      if (!chatId) {
        setMessages([])
      }
    }
  })()}, [])

  useEffect(() => {
    if (chatId) {
      fetchMessages()
    }
  }, [chatId])

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
              {/* <Text style={{fontSize: 20, marginTop: -50}}>No Resource Added Yet</Text>   */}
            </View>
          :
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
                flatlist?.current?.scrollToEnd({animated: true})
              }}              
            />
        }

          <View style={styles.inputContainer}>
            <TextInput 
              style={styles.textInput} 
              value={message}
              onChangeText={setMessage}
              placeholder='Type your message...'
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
    gap: 8,
    marginVertical: 10
  },
  textInput: {
    width: '90%',
    height: 40,
    backgroundColor: 'lightgray',
    borderRadius: 15,
    paddingHorizontal: 10
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