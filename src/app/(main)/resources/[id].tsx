import { ScrollView, StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import { AntDesign } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'

const ResourDetail = () => {
  const description = `Management is not just a skill but an art that requires a unique blend of strategic thinking, leadership, and emotional intelligence. At its core, the art of management is about making the right decisions at the right time and motivating a team to achieve collective goals. It involves understanding the strengths and weaknesses of your team members, effectively communicating objectives, and fostering a culture of collaboration and innovation.

A successful manager is both a leader and a mentor, guiding their team with vision and empathy. They create an environment where ideas can flourish, and team members feel valued and motivated to contribute their best work. This involves setting clear expectations, providing constructive feedback, and recognizing achievements.

The art of management also requires adaptability—being able to respond to challenges and changes in the business environment with agility and foresight. It’s about maintaining a balance between achieving organizational goals and supporting the personal and professional growth of team members.

Moreover, management is an ongoing process of learning and improvement. Great managers continuously refine their approaches, learn from their experiences, and stay open to new ideas and strategies. By mastering the art of management, leaders can drive their organizations toward sustainable success, ensuring that both the company and its people thrive.

`
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title='Resource Detail' />
        <View style={styles.body}>
          <Text style={styles.title}>The Art of Management</Text>
          <Image 
            source={{uri: 'https://cdn.pixabay.com/photo/2016/03/09/09/43/bag-1245954_1280.jpg'}} 
            style={styles.image}
          />
          {description.split('\n\n').map((p, index) => <Text key={index} style={styles.description} >{p}</Text>)}
          <View style={{flexDirection: 'row', alignItems: 'center', gap: 30}}>
            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name='like1' color={Colors.light.tint} size={26} />
              <Text>24</Text>
            </Pressable>

            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name='dislike2' color={Colors.light.tint} size={26} />
              <Text>0</Text>
            </Pressable>

            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name='sharealt' color={Colors.light.tint} size={26} />
              <Text>0</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResourDetail

const styles = StyleSheet.create({
  container: {
    flex:1
  },
  body: {
    width: '100%',
    padding: 10
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginVertical: 5
  },
  description: {
    fontSize: 16, 
    lineHeight: 23,
    textAlign: 'justify',
    letterSpacing: 0.5
  }
})