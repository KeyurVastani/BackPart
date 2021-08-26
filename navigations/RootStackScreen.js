import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();
import SplashScreen from '../Screens/SplashScreen';
import SignUpScreen from '../Screens/SignUpScreen';
import LoginScreen from '../Screens/SignInScreen';
import HomeScreen from '../Screens/HomeScreen';

const RootStackScreen = ({ navigation }) => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="SignInScreen" component={LoginScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            
        </Stack.Navigator>
    );
}



export default RootStackScreen