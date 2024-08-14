import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import ProfileCard from '@/src/components/ProfileCard'
import { Tables } from '@/src/types'
import api from '@/src/api'
import { useFocusEffect } from 'expo-router'
import Colors from '@/src/constants/Colors'

const Counselors = () => {
  const [counselors, setCounselors] = useState<Tables<'profiles'>[] | null>()

  const [isRefershing, setIsRefreshing] = useState(false)

  const fetchData = async () => {
    setIsRefreshing(true)
    // setcounselors(undefined)
    const { data, success} = await api.fetchCounselors()

    if (success) {
      setCounselors(data)
      setIsRefreshing(false)
    } else {
      setCounselors(null)
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
      <Header title='Counselors' />
      <View style={styles.body}>
        {
          counselors === undefined
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size='large' color={Colors.light.tint} />  
            </View>
          : counselors  === null
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>An Error Occured Try again later!</Text>  
            </View>
          : counselors.length  === 0
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>No Counselors Added Yet</Text>  
            </View>
          : <FlatList
              data={counselors}
              renderItem={({item}) => 
                <View style={{flex: 1, marginVertical: 10}}>
                  <ProfileCard
                    {...item}
                  />
                </View>
              }
              keyExtractor={(item) => item.id}
              numColumns={2}
              onRefresh={fetchData}
              refreshing={isRefershing}
              contentContainerStyle={{paddingBottom: 60}}
            />
        }
      </View>
    </SafeAreaView>
  )
}

export default Counselors

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    width: '100%',
    paddingHorizontal: 10
  }
})