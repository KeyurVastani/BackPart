import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../helper/screenHelper'
import Colors from '../assets/colors/color'

const Header = ({ navigation, title }) => {
    return (
        <View style={styles.mainContainer}>
            <View style={{ flex: .4,}}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.toggleDrawer()
                    }}
                >
                    <Icon.Button
                        name='ios-menu'
                        onPress={() => navigation.toggleDrawer()}
                        size={27}
                        backgroundColor={Colors.signInBlue}
                        
                    />

                </TouchableOpacity>
            </View>
            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center',paddingBottom:4 }}>
                <Text style={{ fontSize: 25, marginTop: 6, color: "white", fontFamily: 'roboto-bold' }}>{title}</Text>
            </View>
            <View style={{ flex: .5 }}>
            </View>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        paddingTop:50,
        height:100,
        
    
        
        backgroundColor:Colors.signInBlue

    },
    image: {
        height: 22,
        width: 22,
        tintColor: "green",
    },
});
