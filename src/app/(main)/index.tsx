import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@components/Themed';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '@/src/constants/Colors';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Card from '@/src/components/Card';
import { router, useFocusEffect, useRouter } from 'expo-router';
import { useAuth } from '@/src/providers/AuthProvider';
import { observer } from 'mobx-react';
import { useCallback, useState } from 'react';
import { Tables } from '@/src/types';
import api from '@/src/api';
import supabase from '@/src/libs/supabase';

const Home = observer(() => {
  const { profile } = useAuth()
  const router = useRouter()
  const [counselors, setCounselors] = useState<Tables<'profiles'>[] | null>()
  const [resources, setResources] = useState<Tables<'resources'>[] | null>()

  const fetchResources = async () => {
    const {data, error} = await supabase
      .from('resources')
      .select('*')
      .limit(4)
    if (!error) {
      setResources(data)
    }
    else {
      setResources(null)
    }
  }

  const fetchCounselors = async () => {
    const {data, error} = await supabase
      .from('profiles')
      .select('*')
      .limit(4)
    if (!error) {
      setCounselors(data)
    }
    else {
      setCounselors(null)
    }
  }

  useFocusEffect(useCallback(() => {
    fetchResources()
    fetchCounselors()
  }, []))

  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1, width: '100%'}}>

        <View style={styles.header} lightColor={Colors.light.tint}>
          <View style={styles.headerBtns} lightColor={Colors.light.tint}>
            <Pressable onPress={ () => router.push('/chats')}>
              <AntDesign name='mail' color='#fff' size={24} />
            </Pressable>
            <FontAwesome name='share-alt' color='#fff' size={24} />
            <FontAwesome name='search' color='#fff' size={24} />
          </View>
          <Text style={styles.greetingText} lightColor='#fff' darkColor='#efe'>Hi, {profile?.full_name}</Text>
        </View>
        
        <View style={styles.body}>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Popular Resources</Text>
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
              : 
              <>
              
                <View style={styles.sectionRow}>
                  <Card 
                      title={resources[0]?.title}
                      image={resources[0]?.image_url} 
                      onPress={() => router.push(`/(main)/resources/${resources[0]?.id}`)}
                    />
                  <Card 
                      title={resources[1]?.title}
                      image={resources[1]?.image_url} 
                      onPress={() => router.push(`/(main)/resources/${resources[1]?.id}`)}
                    />
                </View>
                <View style={styles.sectionRow}>
                <Card 
                      title={resources[2]?.title}
                      image={resources[2]?.image_url} 
                      onPress={() => router.push(`/(main)/resources/${resources[2]?.id}`)}
                    />
                  <Card 
                      title={resources[3]?.title}
                      image={resources[3]?.image_url} 
                      onPress={() => router.push(`/(main)/resources/${resources[3]?.id}`)}
                    />
                </View>
              </>
            }
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionHeading}>Top Rated Counselors</Text>
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
              : 
              <>
              
                <View style={styles.sectionRow}>
                  <Card 
                      title={counselors[0]?.full_name}
                      image={counselors[0]?.avatar_url} 
                      onPress={() => router.push(`/counselor/${counselors[0]?.id}`)}
                    />
                  <Card 
                      title={counselors[1]?.full_name}
                      image={counselors[1]?.avatar_url} 
                      onPress={() => router.push(`/counselor/${counselors[1]?.id}`)}
                    />
                </View>
                <View style={styles.sectionRow}>
                <Card 
                      title={counselors[2]?.full_name}
                      image={counselors[2]?.avatar_url} 
                      onPress={() => router.push(`/counselor/${counselors[2]?.id}`)}
                    />
                  <Card 
                      title={counselors[3]?.full_name}
                      image={counselors[3]?.avatar_url} 
                      onPress={() => router.push(`/counselor/${counselors[3]?.id}`)}
                    />
                </View>
              </>
            }
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
    width: '100%',
    justifyContent: 'center'
  },
  sectionRow: {
    flexDirection: 'row', 
    width: '100%', 
    gap: 10,
    justifyContent: 'center'
  },
  sectionHeading: {
    fontSize: 20,
    fontWeight: 'semibold',
    marginLeft: 2,
    marginVertical: 10
  }
});
