import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Alert, Dimensions } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/core'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_STORE } from '../store/action/type'
import Icon from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
import { onLogout } from '../store/action/loginAction';
import { launchImageLibrary } from 'react-native-image-picker';
import Colors from '../assets/colors/color'
``



const width = Dimensions.get('window').width
const height = Dimensions.get('window').height




export function DrawerContent(props) {
    const dispatch = useDispatch()
    const logindata = useSelector((state) => state.loginReducer)
    const username = logindata?.user?.data?.name
    const [imageUrl, setimageUrl] = useState(null)
    const [isImageAvailable, setisImageAvailable] = useState(false)

    const getImage = async () => {

        const profilePic = await AsyncStorage.getItem("profilePic");
        console.log("This s======", profilePic);
        if (profilePic) {
            setisImageAvailable(true),
                setimageUrl(JSON.parse(profilePic))

        };
    }

    useEffect(() => {
        getImage()
    }, [])



    const navigation = useNavigation()
    const twoOptionAlertHandler = () => {
        if (!username) {
            Alert.alert(
                "NOTES",
                "If you want to Upload Profile fotho then You need to SIGN IN",
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
                console.log("0000000000000", source);
                AsyncStorage.setItem("profilePic", JSON.stringify(source));
                console.log("======", JSON.stringify(source));
                setimageUrl(source)
                setisImageAvailable(true)
            }
        }
        )
    }


    return (
        <View style={{ flex: 1, }}>
            <DrawerContentScrollView {...props} bounces='false' >

                <View style={styles.usercontainer}>
                    <View style={{ padding: 7 }}>
                        <View style={styles.profilePic} >

                            {
                                isImageAvailable ? <ImageBackground style={styles.image} source={imageUrl}
                                    imageStyle={styles.image} >
                                    <View style={styles.camaraContainer}>
                                        <TouchableOpacity onPress={() => { twoOptionAlertHandler() }}>
                                            <Icon name="camera" size={25}
                                                style={styles.icon} />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                                    :
                                    <ImageBackground style={styles.image} source={require('../Gallery/AvatarImg.jpeg')}
                                        imageStyle={styles.image} >
                                        <View style={styles.camaraContainer}>
                                            <TouchableOpacity onPress={() => { twoOptionAlertHandler() }}>
                                                <Icon name="camera" size={25}
                                                    style={styles.icon} />
                                            </TouchableOpacity>
                                        </View>
                                    </ImageBackground>
                            }


                        </View>
                    </View>


                    <View style={{ marginRight: 40, paddingRight: 30, left: 13 }}>
                        <Text style={{ fontSize: 25, marginRight: 10 }}>{username ? username : 'UserLogin'}</Text>
                    </View>
                </View>

                <DrawerItemList {...props} />
                <View style={styles.signoutContainer}>
                    <TouchableOpacity
                        onPress={async () => {
                            dispatch(onLogout());
                            navigation.navigate("SignInScreen")
                        }
                        }>
                        <View style={styles.signout}>

                            <Octicons name="sign-out" color="#282E54" size={25} />
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
        padding: 5,
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
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0,
        borderBottomWidth: 2,
        paddingHorizontal: 20,
        paddingBottom: 10,
        paddingTop: 10,
        marginBottom: 20,


    },
    signout: {

        flexDirection: 'row',
        alignItems: 'center',
        right: 10


        // justifyContent: 'center', 
    },
    signoutContainer: {
        marginTop: 220,
        justifyContent: 'center',
        marginRight: 80,
        alignItems: 'center',



    },
    icon: {
        opacity: .6,
        color: Colors.white

    },
    camaraContainer: {
        position: 'absolute',
        left: 49,
        top: 45,
        backgroundColor: Colors.gray,
        opacity: 0.8,
        padding: 6,
        borderWidth: 0,
        borderRadius: 60

    },
    signInText: {
        fontSize: 18,
        paddingBottom: 7,
        paddingLeft: 30
    }


})