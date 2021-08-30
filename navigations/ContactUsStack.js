import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
import ContactUs from '../Screens/ContactUs';
const Stack = createStackNavigator();




const ContactUsStack = ({ navigation }) => {
    return (
        <Stack.Navigator
            screenOptions={{

                headerStyle: {
                    backgroundColor: '#009387',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold'
                }
            }}
        >
            <Stack.Screen name="ContactUs" component={ContactUs}
                options={{

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



export default ContactUsStack
