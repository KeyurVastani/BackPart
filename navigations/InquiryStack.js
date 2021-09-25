import React from 'react'
import { View, Text, Button,TouchableOpacity } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
const Stack = createStackNavigator();
import Colors from '../assets/colors/color'
import Inquiry from '../Screens/Inquiry';
import DateAvailable from '../Screens/DateAvailable';
import Member from '../Screens/Member';
import LastBill from '../Screens/LastBill';
import BookGuest from '../Screens/BookGuest';




const InquiryStack = ({ navigation }) => {
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
            <Stack.Screen name="Inquiry" component={Inquiry}
                options={{
                    title: ' Make An Inquiry',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                       
                        <Icon.Button
                            name='ios-menu'
                            onPress={() => navigation.toggleDrawer()}
                            size={27}
                            
                            backgroundColor={Colors.signInBlue}
                        
                        />
                       
                    ),
                }} />


            <Stack.Screen name="DateAvailable" component={DateAvailable}
                options={{
                    title: 'Check Available Date',
                    headerTitleAlign: 'center',
                    headerBackTitle:' '
                }} />

            <Stack.Screen name="Member" component={Member}
                options={{
                    title: 'select Total Member',
                    headerTitleAlign: 'center',
                    headerBackTitle:' '
                }} />

            <Stack.Screen name="LastBill" component={LastBill}
                options={{
                    title: 'Total Bill',
                    headerTitleAlign: 'center',
                    headerBackTitle:' '
                }} />
            <Stack.Screen name="BookGuest" component={BookGuest}
                options={{
                    title: 'Guest Registration',
                    headerTitleAlign: 'center',
                    headerBackTitle:' '
                }} />


        </Stack.Navigator>
    );
}



export default InquiryStack
