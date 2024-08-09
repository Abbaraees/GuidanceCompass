import { StyleSheet, Text, View, Image } from 'react-native'

type CardProsType = {
  title: string,
  image: string
}
const Card = ({ title, image }: CardProsType) => {
  return (
    <View style={styles.card}>
      <Image 
        source={{ uri: image}}
        style={styles.image}
      />
      <Text style={styles.title}>{title}</Text>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  card: {
    // width: 150,
    maxWidth: 200,
    // borderRadius: 8,
    marginHorizontal: 5
  },
  image: {
    width: '100%',
    // height: 150,
    borderRadius: 9,
    aspectRatio: 1
  },
  title: {
    fontSize: 18,
    textAlign:'center',
    marginTop: 6
  }
})