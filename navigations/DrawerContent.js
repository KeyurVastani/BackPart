import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/core'
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_STORE } from '../store/action/type'
import Icon from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
import { onLogout } from '../store/action/loginAction';
import { launchImageLibrary } from 'react-native-image-picker';







export function DrawerContent(props) {
    const dispatch = useDispatch()
    const logindata = useSelector((state) => state.loginReducer)
    const username = logindata?.user?.data?.name
    const [imageUrl, setimageUrl] = useState(require('../Gallery/2.jpeg'))






    const navigation = useNavigation()
    const twoOptionAlertHandler = () => {
        if (!username) {
            Alert.alert(
                "NOTES",
                "If you want to Upload Profile fotho then You need to LOGIN",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );
        } else {
            Alert.alert(
                'Hello',
                'Are you sure? Do you want to Upload your Image ?',
                [
                    {
                        text: 'Yes',
                        onPress: () => openLibrary()

                    },
                    {
                        text: 'No',
                        onPress: () => console.log('No Pressed'), style: 'cancel'
                    },
                ],
                { cancelable: false },

            );

        }

    };

    const openLibrary = () => {
        let options = {
            mediaType: 'fotho'
        }

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response?.assets[0]?.uri }
                setimageUrl(source)
            }
        }
        )
    }


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>

                <View style={styles.usercontainer}>
                    <View style={styles.profilePic} >

                        <TouchableOpacity onPress={() => { twoOptionAlertHandler() }}>
                            <ImageBackground style={styles.image} source={imageUrl}
                                imageStyle={styles.image} >
                                <View style={styles.camaraContainer}>
                                    <Icon name="camera" size={30} color="#fff"
                                        style={styles.icon} />
                                </View>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>


                    <View style={{ marginRight: 40 }}>
                        <Text style={{ fontSize: 20, marginRight: 10 }}>{username ? username : 'UserLogin'}</Text>
                    </View>
                </View>

                <DrawerItemList {...props} />
                <View style={styles.signoutContainer}>
                    <TouchableOpacity
                        onPress={async () => {
                            dispatch(onLogout());
                            navigation.popToTop()
                        }
                        }>
                        <View style={styles.signout}>

                            <Octicons name="sign-out" color="#282E54" size={35} />
                            {
                                (!username) ? <Text style={styles.signInText}>Sign In</Text> : <Text style={styles.signInText}>Sign Out</Text>
                            }


                        </View>
                    </TouchableOpacity>
                </View>

            </DrawerContentScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    profilePic: {
        height: 80,
        width: 80,
        borderWidth: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',

    },
    image: {
        height: 78,
        width: 78,
        borderRadius: 39,
        alignItems: 'center',
        justifyContent: 'center',

    },
    usercontainer: {
        flexDirection: 'row',
        margin: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    signout: {

        flexDirection: 'row',
        alignItems: 'center',


        // justifyContent: 'center', 
    },
    signoutContainer: {
        marginTop: 260,
        justifyContent: 'center',
        marginLeft: 130,
        alignItems: 'center'

    },
    icon: {
        opacity: .6,
    },
    camaraContainer: {

        marginTop: 40,
        marginLeft: 50

    },
    signInText: {
        fontSize: 23,
        paddingBottom: 5,
        paddingLeft:6
    }


})