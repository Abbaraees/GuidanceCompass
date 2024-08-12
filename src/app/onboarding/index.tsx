import { View, Text } from '@/src/components/Themed'
import { useRouter } from 'expo-router'
import { Image } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'
import { SafeAreaView } from 'react-native-safe-area-context'

const index = () => {
  const router = useRouter()

  const navigateToApp = () => {
    router.replace('/(main)')
  }

  return (
    <Onboarding
      onSkip={navigateToApp}
      onDone={navigateToApp}
      bottomBarHeight={60}
      bottomBarColor="#fff"
      pages={[
        {
          backgroundColor: '#fff',
          image: <Image source={require('../../../assets/images/welcome.png')} />,
          title: 'Welcome to Guidance Compass',
          subtitle: 'Discover your ideal career path',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../../../assets/images/explore.png')} width={100} />,
          title: 'Explore Counselors and Resources',
          subtitle: 'Get to know different career options in depth',
        },
        {
          backgroundColor: '#fff',
          image: <Image source={require('../../../assets/images/book-session.png')} width={100} />,
          title: 'Book a Session With Mentor',
          subtitle: 'Meet top mentors across different fields who could guide you through your requirement',
        },
      ]}
      />
  )
}

export default index