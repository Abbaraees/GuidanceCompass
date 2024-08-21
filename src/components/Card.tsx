import { StyleSheet, Text, View, Image, Pressable } from 'react-native'

type CardProsType = {
  title: string | null,
  image: string | null,
  onPress: () => void
}
const Card = ({ title, image, onPress }: CardProsType) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.card}>
        {image && <Image 
          source={{ uri: image }}
          style={styles.image}
        />}
        <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginBottom: 10
  },
  image: {
    width: '100%',
    borderRadius: 9,
    aspectRatio: 1
  },
  title: {
    fontSize: 16,
    textAlign:'center',
    marginTop: 6
  }
})