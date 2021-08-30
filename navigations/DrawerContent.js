import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/core'

import Icon from 'react-native-vector-icons/FontAwesome'

export function DrawerContent(props) {
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
                        <Text style={{ fontSize: 20 }}>Keyur Vastani</Text>
                    </View>
                </View>

                <DrawerItemList {...props} />
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
        margin: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    }
})