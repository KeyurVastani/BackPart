import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import Colors from '../assets/colors/color'

import Icon from 'react-native-vector-icons/Ionicons'
const Stack = createStackNavigator();

import HomeScreen from '../Screens/HomeScreen';



const HomeStack= ({ navigation }) => {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: Colors.signInBlue,
                height:100
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize:23
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
                            size={27}
                            backgroundColor={Colors.signInBlue}
                            
                        />
                    ),



                }} />


        </Stack.Navigator>
    );
}



export default HomeStack
