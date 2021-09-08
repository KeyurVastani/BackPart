import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'



const BookingSlab = ({ item,onPress }) => {
    const { indate, outdate, totalmember, totalamount, totaldays} = item


    return (

        <View style={styles.container}>
            <Text style={styles.text}>indate  :  {indate}</Text>
            <Text style={styles.text}>outdate :  {outdate}</Text>
            <Text style={styles.text}>totalmember :  {totalmember}</Text>
            <Text style={styles.text}>totalamount :  {totalamount}</Text>
            <Text style={styles.text}>totaldays :  {totaldays}</Text>
            <TouchableOpacity style={styles.touch} onPress={onPress}>
                <Text style={styles.cancle}> cancle Booking</Text>
            </TouchableOpacity>
        </View>


    )
}

export default BookingSlab

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e0cfe1',
        height: hp(18),
        width: wp(100),
        padding: 15,
        marginBottom: 25
    },
    text: {
        fontFamily: 'roboto-medium',
        fontSize: 20,

    },
    cancle: {
        color: 'red',
        fontSize:15


    },
    touch: {
        justifyContent: 'center',
        alignItems:'flex-end'
    }
})
