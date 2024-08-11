import { FlatList, ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from '@components/EditScreenInfo';
import { Text, View } from '@components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/src/constants/Colors';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Card from '@/src/components/Card';
import { router } from 'expo-router';
import AuthProvider, { useAuth } from '@/src/providers/AuthProvider';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

const Home = observer(() => {
  const { profile } = useAuth()
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1, width: '100%'}}>

        <View style={styles.header} lightColor={Colors.light.tint}>
          <View style={styles.headerBtns} lightColor={Colors.light.tint}>
            <AntDesign name='mail' color='#fff' size={24} />
            <FontAwesome name='share-alt' color='#fff' size={24} />
            <FontAwesome name='search' color='#fff' size={24} />
          </View>
          <Text style={styles.greetingText} lightColor='#fff' darkColor='#efe'>Hi, {profile?.full_name}</Text>
        </View>
        <View style={styles.body}>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Popular Resources</Text>
            <FlatList 
              data={Array(4).fill(null)} 
              renderItem={({item, index}) => (
                <View style={styles.cardContainer}>
                  <Card 
                    title={`Resource ${index}`}
                    image={'https://pixabay.com/get/g8bcfd324d44125c98ddb8df212c95d73de154a9d9ed5ae46c28ff781353dee21aef8761f25001fc37de0e42649471c5337c4b025596ccd95077734f22ef26ca9e840679e2d41c1b2fe80a76c29685aab_1280.jpg'} 
                    onPress={() => router.push('/(main)/resources/1')}
                  />
                </View>)} 
              numColumns={2} 
              contentContainerStyle={{gap: 16}} 
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Top Rated Counselors</Text>
            <FlatList 
              data={Array(4).fill(null)} 
              renderItem={({item, index}) => (
                <View style={styles.cardContainer}>
                  <Card 
                    title={`Counselor ${index}`}
                    image={'https://cdn.pixabay.com/photo/2019/06/29/04/36/counselor-4305394_1280.jpg'} 
                    onPress={() => router.push('/counselor/1')}
                  />
                </View>)} 
              numColumns={2} 
              contentContainerStyle={{gap: 16}} 
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
})

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  cardContainer: {
    flex: 1,
  },
  header: {
    width: '100%',
    height: 150,
    padding: 15
  },
  headerBtns: {
    width: 100,
    flexDirection: 'row',
    gap: 30,
    justifyContent: 'flex-end',
    marginLeft: 'auto'
  },
  greetingText: {
    fontSize: 16,
    marginTop: 'auto'
  },
  body: {
    padding: 8,
    width: '100%',
  },
  section: {

  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginLeft: 2,
    marginVertical: 10
  }
});
