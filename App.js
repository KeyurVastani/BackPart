import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import RootStackScreen from './navigations/RootStackScreen'
import SignInScreen from './Screens/SignInScreen'
import SignUpScreen from './Screens/SignUpScreen'
import SplashScreen from './Screens/SplashScreen'
import SliderScreen from './Screens/SliderScreen'
import HomeScreen from './Screens/HomeScreen'
import thunk from 'redux-thunk'
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore } from "redux";
import { appReducer } from './store/reducer/mainReducer'
import NewScreen from './Screens/DateAvailable'
import InquiryStack from './navigations/InquiryStack'
import Drawers from './navigations/Drawer'
import Member from './Screens/Member'
import LastBill from './Screens/LastBill'
import GoaWeather from './Screens/GoaWeather'


const App = () => {
  // const store = createStore(
  //      appReducer,                    // your reducers
  //   compose(applyMiddleware(thunk))
  //   );
  return (
    // <LastBill/>
    // <NavigationContainer>
    //   <Drawer.Navigator initialRouteName="Home">
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    //     {/* <Drawer.Screen name="About_us" component={About_us} /> */}
    //   </Drawer.Navigator>
    // </NavigationContainer>
    // <NewScreen />
    // <SignInScreen/>
    // <SignUpScreen/>
    // <Drawers/>
    <GoaWeather/>
    // <Member/>
    // <NavigationContainer>
    //   <InquiryStack/>
    // </NavigationContainer>



    // <Provider store={store}>
    // <NavigationContainer>
    //   <RootStackScreen />

    // </NavigationContainer>
    // </Provider> 
  )
}




export default App














// const App = () => {
//   return (

//     // <SignInScreen />
//     // <SignUpScreen />
//     // <SplashScreen />
//     // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//     //   <SliderScreen />
//     //  </SafeAreaView>

//     <NewScreen/>




