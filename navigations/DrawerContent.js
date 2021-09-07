import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/core'
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { useSelector, useDispatch } from 'react-redux';
import { RESET_STORE } from '../store/action/type'

import Icon from 'react-native-vector-icons/FontAwesome'
import Octicons from 'react-native-vector-icons/Octicons'
import { onLogout } from '../store/action/loginAction';


export function DrawerContent(props) {
    const dispatch = useDispatch()
    const logindata = useSelector((state) => state.loginReducer)
    const username = logindata?.user?.data?.name
 
    // const removeItemValue = async (key) => {
    //     debugger
    //     try {
    //         debugger
    //         await AsyncStorage.removeItem(key);
    //         debugger
    //         return true;
    //     }
    //     catch (err) {
    //         console.log("err", err)
    //         debugger
    //         return false;
    //     }
    // }

    const navigation = useNavigation()


    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>

                <View style={styles.usercontainer}>
                    <TouchableOpacity onPress={() => navigation.navigate("GalleryStack")}>
                        <View style={styles.profilePic} >
                            <Icon name="user" color="green" size={40} />
                        </View>
                    </TouchableOpacity>

                    <View style={{ marginRight: 40 }}>
                        <Text style={{ fontSize: 20,marginRight:10 }}>{username?username:'UserLogin'}</Text>
                    </View>
                </View>

                <DrawerItemList {...props} />

                <TouchableOpacity onPress={async () => {
                    debugger
                    // removeItemValue('tokenvalue')

                    dispatch(onLogout());


                    //    let b  = await AsyncStorage.removeItem('tokenvalue');
                    //    console.warn(b)
                    navigation.popToTop()
                }
                }>
                    <View style={styles.signout}>

                        <Octicons name="sign-out" color="#282E54" size={35} />
                        <Text style={{fontSize:20}}>Sign Out</Text>

                    </View>
                </TouchableOpacity>

            </DrawerContentScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    profilePic: {
        height: 80,
        width: 80,
        backgroundColor: 'pink',
        borderRadius: 40,
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
        marginTop: 280,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 140,
        marginRight: 20
        // justifyContent: 'center', 
    }


})