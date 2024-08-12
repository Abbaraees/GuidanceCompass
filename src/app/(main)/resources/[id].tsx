import { ScrollView, StyleSheet, Text, View, Image, Pressable, ActivityIndicator, StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '@/src/components/Header'
import { AntDesign } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { Tables } from '@/src/types'
import { useLocalSearchParams } from 'expo-router'
import api from '@/src/api'

const ResourDetail = () => {
  const [resource, setResource] = useState<Tables<'resources'> | null>()
  const { id } = useLocalSearchParams()
  const intId = typeof id === 'string' ? parseInt(id) : parseInt(id[0])

  useEffect(() => {(async () => {
    const result = await api.getResource(intId)

    if (result.success) {
      setResource(result.data)
    } else {
      setResource(null)
    }
  })()}, [] )


  return (
    <ScrollView style={styles.container}>
      <Header title='Resource Detail' />
      <View style={styles.body}>
      {
        resource === undefined
        ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size='large' color={Colors.light.tint} />  
          </View>
        : resource  === null
        ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 20, marginTop: -50}}>An Error Occured Try again later!</Text>  
          </View>
        :
        <>
          <Text style={styles.title}>{resource.title}</Text>
          <Image 
            source={{uri: resource.image_url ? resource.image_url : ''}} 
            style={styles.image}
          />
          {resource.body && resource.body.split('\n').map((p, index) => <Text key={index} style={styles.description} >{p}</Text>)}
          <View style={styles.actions}>
            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name='like1' color={Colors.light.tint} size={26} />
              <Text>{resource.likes}</Text>
            </Pressable>

            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name='dislike2' color={Colors.light.tint} size={26} />
              <Text>{ resource.dislikes }</Text>
            </Pressable>

            <Pressable style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
              <AntDesign name='sharealt' color={Colors.light.tint} size={26} />
            </Pressable>
          </View>
        </>
      }   
      </View>
    </ScrollView>
  )
}

export default ResourDetail

const styles = StyleSheet.create({
  container: {
    flex:1,
    marginTop: StatusBar.currentHeight
  },
  body: {
    width: '100%',
    padding: 10,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600'
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginVertical: 5
  },
  description: {
    fontSize: 16, 
    lineHeight: 23,
    textAlign: 'justify',
    letterSpacing: 0.5
  },
  actions: {
    flexDirection: 'row', 
    alignItems: 'center', 
    gap: 30, 
    marginTop: 10}
})