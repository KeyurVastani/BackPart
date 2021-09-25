import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'

import Colors from '../assets/colors/color'
import Gallery from '../Screens/Gallery';
import ExtraScreen from '../Screens/ExtraScreen';


const Stack = createStackNavigator();

const GalleryStack = ({ navigation }) => {
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
            <Stack.Screen name="Gallery" component={Gallery}
                options={{
                    title: 'Gallery',
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
               <Stack.Screen name="ExtraScreen" component={ExtraScreen}
                options={{
                    title: 'View',
                    headerTitleAlign: 'center',
                    headerBackTitle:' '
                }} />
                



            


        </Stack.Navigator>
    );
}



export default GalleryStack
