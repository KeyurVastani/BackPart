import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
import AboutUs from '../Screens/AboutUs';
const Stack = createStackNavigator();
import Colors from '../assets/colors/color'



const AboutUsStack = ({ navigation }) => {
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
            <Stack.Screen name="AboutUs" component={AboutUs}
                options={{
                    title: 'About Us',
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


        </Stack.Navigator>
    );
}



export default AboutUsStack
