import React from 'react'
import { View, Text, StyleSheet, ScrollView, ImageBackground } from 'react-native'


import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'

const ContactUs = () => {
    return (
        <View style={{ flex: 1 }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View >
                    <View>
                        <ImageBackground
                            style={styles.fotho}
                            source={require('../images/aboutUs.png')}>

                            <Text style={styles.ImageText}>About Us</Text>

                        </ImageBackground>
                    </View>






                </View>
            </ScrollView>

        </View >
    )
}

export default ContactUs

const styles = StyleSheet.create({
    fotho: {
        resizeMode: 'cover',
        height: hp(35),
        width: wp(100)
    },

    outercontainer: {
        backgroundColor: "#FFF0D4",
        marginTop: 40,
        padding: 10,
        height: 160,
        justifyContent: 'center',
        borderRadius: 30

    },
    ImageText: {
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute', // child
        bottom: "40%", // position where you want
        left: "28%",

        fontSize: 45
    }

});
