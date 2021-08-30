import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
const Stack = createStackNavigator();

import HomeScreen from '../Screens/HomeScreen';



const HomeStack= ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#009387',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold'
            }
        }
        }>
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    title: 'HomeScreen',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button
                            name='ios-menu'
                            onPress={() =>navigation.toggleDrawer()}
                            size={25}
                            backgroundColor='#009387'
                        />
                    ),



                }} />


        </Stack.Navigator>
    );
}



export default HomeStack
