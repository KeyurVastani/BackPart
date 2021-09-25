import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'
import Colors from '../assets/colors/color'



const BookingSlab = ({ item, onPress, cancelDisable = false }) => {
    const { indate, outdate, totalmember, totalamount, totaldays } = item


    return (
        <SafeAreaView>
            <View style={{ flex: 1 }}>
                <View style={styles.container}>
                    <View style={styles.container1} >
                        <View>
                            <Image style={styles.image} source={require('../Gallery/2.jpeg')} />
                        </View>
                        <View>
                            <Text style={styles.text}>{indate} To {outdate}</Text>
                            <Text style={styles.text}>Days:       {totaldays}</Text>
                            <Text style={styles.text}>Member: {totalmember}</Text>
                            <Text style={[styles.text, { color: '#5A5AFF', marginTop: 5 }]}>Total Amount:{totalamount}</Text>
                        </View>
                    </View>
                    {cancelDisable && <View style={styles.container2}>
                        <TouchableOpacity style={styles.touch} onPress={onPress}>
                            <Text style={{ color: 'red', fontSize: 16, }}>Cancel Booking</Text>
                        </TouchableOpacity>
                    </View>}

                </View>

            </View>
        </SafeAreaView>

    )
}

export default BookingSlab



const styles = StyleSheet.create({
    container: {
        margin: 10,
        height: hp(19),
        width: hp(45),
        padding: 20,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        backgroundColor: '#E7F4F1'

    },
    image: {
        width: hp(12),
        height: wp(26.5), borderRadius: 10, backgroundColor: 'blue'
    }, text: {
        fontSize: 19, fontFamily: 'roboto', paddingLeft: 15, marginBottom: 3
    }, container1: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'

    }, container2: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        top:4,
        
    },
})

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#e0cfe1',
//         height: hp(18),
//         width: wp(100),
//         padding: 15,
//         marginBottom: 25
//     },
//     text: {
//         fontFamily: 'roboto-medium',
//         fontSize: 20,

//     },
//     cancle: {
//         color: 'red',
//         fontSize: 15


//     },
//     touch: {
//         justifyContent: 'center',
//         alignItems: 'flex-end'
//     }
// })
