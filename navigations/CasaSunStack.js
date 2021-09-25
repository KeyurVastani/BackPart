import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import CasaSunshineView from '../Screens/CasaSunshineView';
import Colors from '../assets/colors/color'



const Stack = createStackNavigator();

const CasaSunStack= ({ navigation }) => {
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
            <Stack.Screen name="CasaSunshineView" component={CasaSunshineView}
                options={{
                    title: 'Amenities',
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



export default CasaSunStack
