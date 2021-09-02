import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
const Stack = createStackNavigator();

import Inquiry from '../Screens/Inquiry';
import DateAvailable from '../Screens/DateAvailable';
import Member from '../Screens/Member';
import LastBill from '../Screens/LastBill';




const InquiryStack = ({ navigation }) => {
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
            <Stack.Screen name="Inquiry" component={Inquiry}
                options={{
                    title: ' Make An Inquiry',
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


            <Stack.Screen name="DateAvailable" component={DateAvailable}
                options={{
                    title: 'Check Available Date',
                    headerTitleAlign: 'center',
                }} />

            <Stack.Screen name="Member" component={Member}
                options={{
                    title: 'select Total Member',
                    headerTitleAlign: 'center',
                }} />

            <Stack.Screen name="LastBill" component={LastBill}
                options={{
                    title: ' Total Bill',
                    headerTitleAlign: 'center',
                }} />


        </Stack.Navigator>
    );
}



export default InquiryStack
