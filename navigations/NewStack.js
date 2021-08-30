import React from 'react'
import { View, Text, Button } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons'
const Stack = createStackNavigator();
import newScreen from '../Screens/NewScreen';



const NewStack = ({ navigation }) => {
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
            <Stack.Screen name="NewScreen" component={newScreen}
                options={{
                    title: 'NewS',
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <Icon.Button
                        name='ios-menu'
                          onPress={() => navigation.openDrawer()}
                          size={25}
                          backgroundColor='#009387'
                        />
                      ),
                    


                }} />


        </Stack.Navigator>
    );
}



export default NewStack
