import { FlatList, StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import ResourceCard from '@/src/components/ResourceCard'
import { Tables } from '@/src/types'
import { useFocusEffect } from 'expo-router'
import Colors from '@/src/constants/Colors'
import api from '@/src/api'

const Resources = () => {
  const [resources, setResources] = useState<Tables<'resources'>[] | null>()
  const [isRefershing, setIsRefreshing] = useState(false)

  const fetchData = async () => {
    setIsRefreshing(true)
    // setResources(undefined)
    const { data, success} = await api.fetchResources()

    if (success) {
      setResources(data)
      setIsRefreshing(false)
    } else {
      setResources(null)
      setIsRefreshing(false)
    }

  }

  useFocusEffect(
    useCallback(() => {
      fetchData()
    }, [])
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Resources' />
      <View style={styles.body}>
        {
          resources === undefined
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size='large' color={Colors.light.tint} />  
            </View>
          : resources  === null
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>An Error Occured Try again later!</Text>  
            </View>
          : resources.length  === 0
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>No Resource Added Yet</Text>  
            </View>
          : <FlatList
              data={resources}
              renderItem={({item}) => <ResourceCard 
                id={item.id}
                key={item.id}
                title={item.title}
                description={`${item.body?.split(' ').slice(0, 35).join(' ')} ...`}
                image={item.image_url}
              />}
              onRefresh={fetchData}
              refreshing={isRefershing}
              contentContainerStyle={styles.resources}
            />
        }
      </View>
    </SafeAreaView>
  )
}

export default Resources

const styles = StyleSheet.create({
  container: {
    flex: 1
  }, 
  body: {
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resources: {
    width: '100%',
    gap: 10, 
    paddingBottom: 55, 
    alignItems: 'center'
 
  }
})