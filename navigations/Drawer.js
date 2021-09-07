import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'






//File
import CasaSunStack from './CasaSunStack';
import HomeStack from './HomeStack';
import GalleryStack from './GalleryStack';
import AboutUsStack from './AboutUsStack';
import ContactUsStack from './ContactUsStack';
import InquiryStack from './InquiryStack';
import WeatherScreen from '../Screens/WeatherScreen';
import GuestDetail from '../Screens/GuestDetail';
import UserBooking from '../Screens/UserBooking';
//DrawerContent
import { DrawerContent } from './DrawerContent';
import { useSelector, useDispatch } from 'react-redux';


const Drawer = createDrawerNavigator();

const Drawers = () => {

    const logindata = useSelector((state) => state.loginReducer)
    const username = logindata?.user?.data?.name
 
    return (

        <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />} screenOptions={{
            headerShown: false,
        }}>
            <Drawer.Screen name="Home" component={HomeStack}
                options={{
                    title: 'Home',
                    drawerIcon: ({ focused, size }) => (
                        <Icon
                            name="home"
                            size={size}
                            color={focused ? '#7cc' : '#312f2f'}
                        />
                    ),
                }}
            />

            <Drawer.Screen name="casaSunStack" component={CasaSunStack}
                options={{
                    title: 'Amenities',
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome
                            name="street-view"
                            size={size}
                            color={focused ? '#7cc' : '#312f2f'}
                        />
                    ),
                }}
            />

            
                <Drawer.Screen name="GalleryStack" component={GalleryStack}
                    options={{
                        title: 'Gallery',
                        drawerIcon: ({ focused, size }) => (
                            <MaterialCommunityIcons
                                name="view-dashboard"
                                size={size}
                                color={focused ? '#7cc' : '#312f2f'}
                            />
                        ),
                    }}
                />

            {/* <Drawer.Screen name="AboutUsStack " component={AboutUsStack}
                options={{
                    title: 'About Us',
                    drawerIcon: ({ focused, size }) => (
                        <FontAwesome
                            name="group"
                            size={size}
                            color={focused ? '#7cc' : '#312f2f'}
                        />
                    ),
                }}
            /> */}

            <Drawer.Screen name="ContactUsStack" component={ContactUsStack}
                options={{
                    title: 'Contact Us',
                    drawerIcon: ({ focused, size }) => (
                        <MaterialIcons
                            name="connect-without-contact"
                            size={size}
                            color={focused ? '#7cc' : '#312f2f'}
                        />
                    ),
                }}
            />
            <Drawer.Screen name="InquiryStack" component={InquiryStack}
                options={{
                    title: 'Make An Inquiry',
                    drawerIcon: ({ focused, size }) => (
                        <Entypo
                            name="back-in-time"
                            size={size}
                            color={focused ? '#7cc' : '#312f2f'}
                        />
                    ),
                }}
            />

            <Drawer.Screen name="WeatherScreen" component={WeatherScreen}
                options={{
                    title: 'Weather',
                    drawerIcon: ({ focused, size }) => (
                        <MaterialCommunityIcons
                            name="weather-cloudy"
                            size={size}
                            color={focused ? '#7cc' : '#312f2f'}
                        />
                    ),
                }}
            />

           {username? <Drawer.Screen name="UserBooking" component={UserBooking}
                options={{
                    title: 'UserBookingDetail',
                    drawerIcon: ({ focused, size }) => (
                        <MaterialCommunityIcons
                            name="book-account"
                            size={size}
                            color={focused ? '#7cc' : '#312f2f'}
                        />
                    ),
                }}
            />:<Drawer.Screen name="GuestBooking" component={GuestDetail}
            options={{
                title: 'GuestBookingDetail',
                drawerIcon: ({ focused, size }) => (
                    <MaterialCommunityIcons
                        name="book-account"
                        size={size}
                        color={focused ? '#7cc' : '#312f2f'}
                    />
                ),
            }}
        />} 

        </Drawer.Navigator>

    );
}

export default Drawers