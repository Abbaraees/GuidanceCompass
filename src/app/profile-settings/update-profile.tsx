import { StatusBar, StyleSheet, Text, View, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Header from '@/src/components/Header'
import InputField from '@/src/components/InputField'
import Button from '@/src/components/Button'
import UpateProfileViewModel from './UpateProfileViewModel'
import { useAuth } from '@/src/providers/AuthProvider'
import { observer } from 'mobx-react'
import { useRouter } from 'expo-router'

const UpdateProfle = () => {
  const router = useRouter()
  const { profile } = useAuth()
  const [viewModel, setViewModel] = useState<UpateProfileViewModel>()
  useEffect(() => {
    const viewModel = new UpateProfileViewModel(profile)
    setViewModel(viewModel)
  }, [])

  useEffect(() => {
    if (viewModel?.updateError) {
      Alert.alert("Update Failed", viewModel?.updateMessage)
    }
    if (viewModel?.updateSuccess) {
      viewModel?.setUpdateSuccess(false)
      router.back()
    }
  }, [viewModel?.updateError, viewModel?.updateSuccess])
  return (
    <KeyboardAwareScrollView style={styles.container}>
      <Header title='Profile' />
      <View style={styles.body}>
      <Image 
          source={{uri: 'https://cdn.pixabay.com/photo/2017/03/27/12/11/boy-2178303_1280.jpg'}}
          style={styles.profileImage}
        />
        <InputField
          label='Full Name'
          value={viewModel?.full_name}
          onChange={(name) => viewModel?.setFullName(name)}
        />
        <InputField
          label='Qualification'
          value={viewModel?.qualification}
          onChange={(text) => viewModel?.setQualification(text)}
        />
        <InputField
          label='Institution'
          value={viewModel?.institution}
          onChange={(text) => viewModel?.setInstitution(text)}
        />
        <InputField
          label='Field of Study'
          value={viewModel?.field_of_study}
          onChange={(text) => viewModel?.setFieldOfStudy(text)}
        />
        {
          profile?.role !== 'student' &&
          <>
            <InputField
              label='Years of Experience'
              value={viewModel?.institution}
              onChange={(text) => viewModel?.setInstitution(text)}
            />
            <InputField
              label='Work Field'
              value={viewModel?.field_of_work}
              onChange={(text) => viewModel?.setFieldOfWork(text)}
            />
            <InputField
              label='Position'
              value={viewModel?.position}
              onChange={(text) => viewModel?.setPosition(text)}
            />
            {
              profile?.role == 'counselor' && (
                <>
                  <InputField
                    label='Available Working Hours'
                    value={viewModel?.available_hours}
                    onChange={(text) => viewModel?.setAvailableHours(text)}
                  />
                  <InputField
                    label='Target Audience'
                    value={viewModel?.target_audience}
                    onChange={(text) => viewModel?.setTargetAudience(text)}
                  />
                </>
              )
            }
            
            </>
        }
       

        <Button title='Save' onPress={() => {viewModel?.updateProfile()}}/>
      </View>
    </KeyboardAwareScrollView>
  )
}

export default observer(UpdateProfle)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight
  },
  body: {
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 75,
  },
})