import { View, Image, Text, StyleSheet } from "react-native"
import { defaultAvatar } from "../utils"


type ChatItemPropTypes = {other: {full_name: string, role: string, avatar_url: string}}

const ChatItem = ({other}: ChatItemPropTypes) => {
  return (
    <View style={styles.container}>
      <Image 
        source={{uri: other.avatar_url || defaultAvatar}} 
        style={styles.profileImage}
      />
      <View style={styles.userInfo}>
        <Text style={{fontWeight: 'semibold', fontSize: 16}}>{other.full_name}</Text>
        <Text style={styles.position}>{other.role}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    padding: 5,
    borderColor: '#999',
    borderWidth: 1.5,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  userInfo: {
    gap: 4
  },
  position: {
    color: 'gray',
    textTransform: 'capitalize'
  }
})

export default ChatItem