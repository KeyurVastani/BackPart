import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
import AboutUs from '../Screens/AboutUs';
const Stack = createStackNavigator();




const AboutUsStack = ({ navigation }) => {
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
            <Stack.Screen name="AboutUs" component={AboutUs}
                options={{
                    title: 'About Us',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button
                            name='ios-menu'
                            onPress={() => navigation.toggleDrawer()}
                            size={25}
                            backgroundColor='#009387'
                        />
                    ),



                }} />


        </Stack.Navigator>
    );
}



export default AboutUsStack
