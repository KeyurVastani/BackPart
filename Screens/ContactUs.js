import React from 'react'
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native'


import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'

const ContactUs = () => {
    return (
        <ScrollView  showsVerticalScrollIndicator={false} bounces='false'>
            <View style={{ flex: 1 }}>

                <View >
                    <View>
                        <Image
                            style={styles.fotho}
                            source={require('../images/contact.png')}
                        />
                    </View>
                    <View style={styles.outercontainer}>
                        <View>
                            <Text style={{ fontSize: 25, fontFamily: 'Roboto-bold' }}>Feel free to write on</Text>
                            <Text style={{ fontSize: 20, fontFamily: 'Roboto-thin' }}>info@allogio.com</Text>
                            <Text style={{ fontSize: 17, marginTop: 4 }}>
                                Morbi viverra viverra tincidunt. Nam condimentum nulla et tortor ultrices tempor. Duisanisi mattis, vehicula augue id, aliquet risus
                            </Text>
                        </View></View>
                </View>


                {/* //------------------------------------------------ */}



                <View style={styles.outercontainer}>
                    <View>
                        <Text style={{ fontSize: 25, fontFamily: 'Roboto-bold' }}>Call us +3155577783</Text>

                        <Text style={{ fontSize: 17, marginTop: 4 }}>
                            Morbi viverra viverra tincidunt. Nam condimentum nulla et tortor ultrices tempor. Duisanisi mattis, vehicula augue id, aliquet risus
                        </Text>
                    </View>
                </View>



                {/* //------------------------------------------------ */}



                <View style={styles.outercontainer}>
                    <View>
                        <Text style={{ fontSize: 25, fontFamily: 'Roboto-bold' }}>Visit us on Via Venti Settembre,Roma</Text>

                        <Text style={{ fontSize: 17, marginTop: 4 }}>
                            Morbi viverra viverra tincidunt. Nam condimentum nulla et tortor ultrices tempor. Duisanisi mattis, vehicula augue id, aliquet risus
                        </Text>
                    </View>
                </View>

                {/* //------------------------------------------------ */}



                <View style={styles.outercontainer}>
                    <View>
                        <Text style={{ fontSize: 25, fontFamily: 'Roboto-bold' }}>How can I help You?</Text>

                        <Text style={{ fontSize: 17, marginTop: 4 }}>

                            Maecenas consectetur, diam nec posuere aliquam, libero sapien aliquet lacus, tempus cursus odio dolor ac magna. Nam condimentum nulla et tortor ultrices tempor. Duis ac nisi mattis, vehicula augue id aliquet.
                        </Text>
                    </View>
                </View>
            </View >
        </ScrollView>
    )
}

export default ContactUs

const styles = StyleSheet.create({
    fotho: {
        resizeMode: 'cover',
        height: hp(30),
        width: wp(100)
    },

    outercontainer: {
        backgroundColor: "#FFF0D4",
        marginTop: 40,
        padding: 10,
        height: 160,
        justifyContent: 'center',
        borderRadius: 30,
        marginBottom:30

    }

});
