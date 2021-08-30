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
import NewScreen from './Screens/NewScreen'
import ContactUsStack from './navigations/ContactUsStack'
import Form from './components/Form'


import Drawers from './navigations/Drawer'


const App = () => {
  return (
    // <NavigationContainer>
    //   <Drawer.Navigator initialRouteName="Home">
    //     <Drawer.Screen name="Home" component={HomeScreen} />
    //     {/* <Drawer.Screen name="About_us" component={About_us} /> */}
    //   </Drawer.Navigator>
    // </NavigationContainer>
    // <NewScreen />
    // <Drawers/>
    <NavigationContainer>
      <ContactUsStack/>
    </NavigationContainer>
  
  

  )
}

export default App










// const store = createStore(
//   appReducer,                    // your reducers
//   compose(applyMiddleware(thunk))
//   );



// const App = () => {
//   return (

//     // <SignInScreen />
//     // <SignUpScreen />
//     // <SplashScreen />
//     // <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//     //   <SliderScreen />
//     //  </SafeAreaView>

//     <NewScreen/>




// //  <Provider store={store}>
// //     <NavigationContainer>
// //       <RootStackScreen />

// //     </NavigationContainer>
// //     </Provider> 
//   )
// }