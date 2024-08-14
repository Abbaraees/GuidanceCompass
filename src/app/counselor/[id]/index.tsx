import { StyleSheet, Text, View, Image, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import Button from '@/src/components/Button'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { Tables } from '@/src/types'
import api from '@/src/api'
import { useAuth } from '@/src/providers/AuthProvider'

const CounselorDetail = () => {
  const router = useRouter()
  const [counselor, setCounselor] = useState<Tables<'profiles'> | null>()
  const { id } = useLocalSearchParams()
  const stringId = typeof id === 'string' ? id : id[0]
  const { profile } = useAuth()

  useEffect(() => {(async () => {
    const result = await api.getCounselor(stringId)

    if (result.success) {
      setCounselor(result.data)
    } else {
      setCounselor(null)
    }
  })()}, [] )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Header title='About Counselor' />
        <View style={styles.body}>
        {
          counselor === undefined
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <ActivityIndicator size='large' color={Colors.light.tint} />  
            </View>
          : counselor  === null
          ? <View style={{height: '95%', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginTop: -50}}>An Error Occured Try again later!</Text>  
            </View>
          :
          <>
          
            <View style={styles.profileInfo}>
              <Image
                source={{uri: 'https://cdn.pixabay.com/photo/2018/05/16/15/13/businessman-3406030_960_720.jpg'}} 
                style={styles.image}
              />
              <Text style={styles.name}>{counselor.full_name}</Text>
              <View style={{flexDirection: 'row', gap: 5, marginVertical: 10}}>
                {Array(counselor.ratings).fill(null).map((_, index) => (
                  <FontAwesome name='star' color={Colors.light.tint} size={24} key={index}/>
                ))}
              </View>
              <Text style={styles.qualifications}>{counselor.qualification} {counselor.field_of_study}.</Text> 
              <Text style={styles.qualifications}>{counselor.position} at {counselor.company}</Text>
              <View style={styles.audience}>
                {counselor.target_audience?.split(',').map((item, index) => (
                  <Text key={index} style={styles.audienceItem}>{item}</Text>
                ))}
              </View>
            </View>

            <View style={styles.services}>
              <View style={styles.service}>
                <Text style={styles.itemName}>Experience:</Text>
                <Text style={styles.itemValue}>{counselor.years_of_experience}  years</Text>
              </View>
              <View style={styles.service}>
                <Text style={styles.itemName}>Counselling:</Text>
                <Text style={styles.itemValue}>10 Sessions</Text>
              </View>
              <View style={styles.service}>
                <Text style={styles.itemName}>Available on:</Text>
                <Text style={styles.itemValue}>{counselor.available_hours}</Text>
              </View>
            </View>
            { profile?.id !== counselor.id && (
              <View style={styles.actions}>
                <Button title='Chat' onPress={() => router.navigate(`/counselor/${id}/chat`)}/>
                <Button title='Book Appointment' onPress={() => {}} />
              </View>
              ) 
            }
          </>
        }
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CounselorDetail

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  body: {
    width: '100%',
  },
  profileInfo: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15

  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  qualifications: {
    width: '80%',
    maxWidth: 300,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 16,
    fontStyle: 'italic',
  },
  audience: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 15
  },
  audienceItem: {
    fontSize: 16,
    borderColor: '#565656',
    color: '#565656',
    borderWidth: 1,
    width: 130,
    textAlign: 'center',
    borderRadius: 10
  },
  services: {
    width: '100%',
    marginTop: 10,
    paddingHorizontal: 20
  },
  service: {
    flexDirection: 'row', 
    gap: 5,
    marginBottom: 10
  },
  itemName: {
    fontSize: 16
  },
  itemValue: {
    fontSize: 16,
    color: 'gray',
    width: '80%'
  },
  actions: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingVertical: 10,
    gap: 10
  }
})