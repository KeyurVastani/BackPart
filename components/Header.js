import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/Ionicons'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from '../helper/screenHelper'

const Header = ({ navigation ,title}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={{flex:.5,marginLeft:5}}>
            <TouchableOpacity
                onPress={() => {
                    navigation.toggleDrawer()
                }}
            >
                <Icon.Button
                            name='ios-menu'
                            onPress={() => navigation.toggleDrawer()}
                            size={25}
                            backgroundColor='#009387'
                        />

            </TouchableOpacity>
            </View>
            <View style={{flex:2,backgroundColor:'#009387'}}>
            <Text style={{fontSize:25,marginTop:6,color:"white",fontFamily:'roboto-bold'}}>{title}</Text>
            </View>

        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    mainContainer: {
        flexDirection: "row",
        marginTop: hp(6),
        // marginLeft: wp(2),
        borderBottomWidth: 0.5, 
        borderColor:"white" ,backgroundColor:'#009387' 

    },
    image: {
        height: 22,
        width: 22,
        tintColor: "green",
    },
});
