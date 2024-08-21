import { View, Text, StyleSheet, StatusBar, ActivityIndicator, FlatList, Image, Pressable} from 'react-native'
import Header from '@components/Header'
import { useEffect, useState } from 'react'
import supabase from '../../libs/supabase'
import { useAuth } from '../../providers/AuthProvider'
import Colors from '../../constants/Colors' 
import ChatItem from '@components/ChatItem'
import { useRouter } from 'expo-router'


const Chats = () => {
  const [chats, setChats] = useState()
  const { profile } = useAuth()
  const router = useRouter()

  const fetchChats = async () => {
    const {data, error} = await supabase
      .from('profiles')
      .select(`
        chats (
          id,
          chat_messages (
            sender:sender_id(id, full_name, avatar_url, role),
            receiver:receiver_id(id, full_name, avatar_url, role)
          )
        )
      `)
      .eq('id', profile.id)
      .single()


    if (!error) {
      setChats(data.chats)
    } else {
      setChats(null)
    }
  }

  useEffect(() => {
    fetchChats()
  }, [])

  return (
    <View style={styles.container}>
      <Header title='Chats' />
      <View style={styles.body}>
        {
          chats === undefined
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size='large' color={Colors.light.tint} />  
            </View>
          : chats  === null
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>An Error Occured Try again later!</Text>  
            </View>
          : chats.length  === 0
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>No Resource Added Yet</Text>  
            </View>
          : 
          <FlatList
              data={chats}
              renderItem={({item}) => (
                <Pressable onPress={() => router.push(`/chats/${item.id}`)}>
                  <ChatItem 
                    other={
                      item.chat_messages[0].sender.id !== profile.id
                      ? item.chat_messages[0].sender
                      : item.chat_messages[0].receiver
                    }
                  />
                </Pressable>
              )}
              // onRefresh={fetchChats}
              // refreshing={isRefershing}
            />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  body: {
    padding: 10,

  }
})

export default Chats