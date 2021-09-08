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
import  AppReducer from './store/reducer/mainReducer'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

import NewScreen from './Screens/DateAvailable'
import InquiryStack from './navigations/InquiryStack'
import Drawers from './navigations/Drawer'
import Member from './Screens/Member'
import LastBill from './Screens/LastBill'
import GalleryStack from './navigations/GalleryStack'
import GuestDetail from './Screens/GuestDetail'
import DateAvailable from './Screens/DateAvailable'
import BookingSlab from './components/BookingSlab'


const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer(persistConfig, AppReducer);
let store = createStore(persistedReducer, applyMiddleware(thunk));
let persistor = persistStore(store);


const App = () => {


  return (

    // <GuestDetail/>
    // <LastBill/>
   
    // <NewScreen />
    // <SignInScreen/>
    // <SignUpScreen/>
    // <NavigationContainer> <Drawers/></NavigationContainer>

    // <Inquiry/>
    // <Header/>
    // <HomeScreen/>
    // <CasaSunshineView/>
    // <BookGuest/>

    // <BookingSlab/>

    // <SplashScreen/>
    // <LastBill/>
    // <Member />
    // <SafeAreaView style={{flex:1}}>
    //    <WeatherScreen/></SafeAreaView>
    // <Member/>
    // <NavigationContainer>
    //   <InquiryStack/>
    // </NavigationContainer>
    //   <NavigationContainer>
    //  <GalleryStack/>
    // </NavigationContainer>
    



    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <RootStackScreen />
        </NavigationContainer>
      </PersistGate>
    </Provider>
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




