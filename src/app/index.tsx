import { Redirect } from 'expo-router'
import React from 'react'

function index() {
  return (
     <Redirect href={'/onboarding'} />
  )
}

export default index