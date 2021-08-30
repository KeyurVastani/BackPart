import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'


import Gallery from '../Screens/Gallery';


const Stack = createStackNavigator();

const GalleryStack = ({ navigation }) => {
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
            <Stack.Screen name="Gallery" component={Gallery}
                options={{
                    title: 'Gallery',
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



export default GalleryStack
