import { FlatList, StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Header from '@/src/components/Header'
import ResourceCard from '@/src/components/ResourceCard'

const Resources = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title='Resources' />
      <View style={styles.body}>
        <FlatList
          data={Array(12).fill(null)}
          renderItem={({item, index}) => <ResourceCard 
            id={index}
            key={index}
            title={"The Art of Management"}
            description={"Management is not just a skill but an art that requires a unique blend of strategic thinking, leadership, and emotional intelligence."}
            image='https://cdn.pixabay.com/photo/2016/03/09/09/43/bag-1245954_1280.jpg'
          />}
          contentContainerStyle={{gap: 10, paddingBottom: 55}}
        />
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
    padding: 10
  }
})