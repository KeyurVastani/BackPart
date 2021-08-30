import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'





//File
import CasaSunStack from './CasaSunStack';
import HomeStack from './HomeStack';
import GalleryStack from './GalleryStack';
import AboutUsStack from './AboutUsStack';
import ContactUsStack from './ContactUsStack';
//DrawerContent
import { DrawerContent } from './DrawerContent';

const Drawer = createDrawerNavigator();

export default function Drawers() {
    return (
        <NavigationContainer>
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
                        title: 'CasaSunShineView',
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
                <Drawer.Screen name="AboutUsStack " component={AboutUsStack}
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
                />

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


            </Drawer.Navigator>
        </NavigationContainer>
    );
}