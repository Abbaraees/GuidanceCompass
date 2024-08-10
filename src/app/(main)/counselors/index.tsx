import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import ProfileCard from '@/src/components/ProfileCard'

const Counselors = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Counselors' />
      <View style={styles.body}>
        <FlatList
          data={Array(12).fill(null)}
          renderItem={({item, index}) => (
            <View style={{flex: 1}}>
              <ProfileCard key={index} />
            </View>
          )}
          numColumns={2}
          contentContainerStyle={{gap: 10, paddingBottom: 60, paddingTop: 10}}
        />
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