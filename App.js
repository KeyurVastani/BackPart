import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import RootStackScreen from './navigations/RootStackScreen'
import SignInScreen from './Screens/SignInScreen'
import SignUpScreen from './Screens/SignUpScreen'
import SplashScreen from './Screens/SplashScreen'
import SliderScreen from './Screens/SliderScreen'
import HomeScreen from './Screens/HomeScreen'




const App = () => {
  return (

    // <SignInScreen />
    // <SignUpScreen />
    // <SplashScreen />
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <SliderScreen />
    </SafeAreaView>

    



    // <NavigationContainer>
    //   <RootStackScreen />

    // </NavigationContainer>
  )
}

export default App


