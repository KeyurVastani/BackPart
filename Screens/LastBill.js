
import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

import Colors from '../assets/colors/color'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { NavigationContainer } from '@react-navigation/native'
const LastBill = (props) => {
    const date = props?.route?.params?.date
    const total= props?.route?.params?.member
  

    console.log("prospsssss", props?.route?.params?.date)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainColor }}>


            <View style={{ justifyContent: 'center', alignItems: "center", marginTop: "35%" }}>

                <View style={styles.container}>

                    {/* first    ==============        */}
                    <View style={{ borderBottomWidth: 1, borderColor: "#A999AF", justifyContent: 'center', alignItems: 'center', height: 90 }}>
                        <Text>User name</Text>
                        <Text>date :20/20/20</Text>
                    </View>


                    {/* second =====================*/}
                    <View style={{ marginHorizontal: 10 }}>
                        {/* first-------------------- */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <View style={{marginTop:20}}>
                                <Text style={{fontSize:20}}>The dirving Park</Text>
                                <Text style={{fontSize:20}}>this is a beautiful park</Text>
                            </View>
                            <View>
                                <Image source={require('../images/2.png')} style={{ height: 80, width: 80, resizeMode: 'cover' }} />
                            </View>
                        </View>


                        {/* second2------------------- */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                            <View style={styles.insideCont}>
                                <Text style={styles.text}>GUESTS</Text>
                                <Text style={styles.smalltext}>{total}</Text>
                            </View>

                            <View style={{ flex: 0.1 }} />

                            <View style={[styles.insideCont]}>
                                <Text style={styles.text}>ROOMS</Text>
                                <Text style={styles.smalltext}>Classic(2x)</Text>
                            </View>

                            <View style={{ flex: 0.1 }} />

                            <View style={[styles.insideCont]}>
                                <Text style={styles.text}>PRICE</Text>
                                <Text style={styles.smalltext}>$ {total*1000}</Text>
                            </View>
                        </View>


                        <View style={styles.location}>
                            <View >
                                <EvilIcons
                                    name="location"
                                    size={40} />
                            </View>
                            <View >
                                <Text style={{fontSize:15}}> The DivinePark,E-582,Greate Kailash-2, Goa</Text>
                            </View>
                        </View>

                        <View style={{marginTop:50,alignItems:'center',justifyContent:'center'}}>
                            <TouchableOpacity onPress={()=>props.navigation.popToTop()}  >
                                <Text style={[styles.text,{fontFamily:'roboto-medium'}]}>Cancle Booking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>

            </View>
        </View>
    )
}

export default LastBill

const styles = StyleSheet.create({
    container: {
        height: 500,
        width: 370,
        backgroundColor: "#d0dee5",
        borderRadius: 20
    },
    insideCont: {
        flex: 1,
        backgroundColor: 'rgba(166,177,183,0.4)',
        height: 90,
        width: 60, alignItems: 'center',
        padding: 10,
        borderRadius: 10, justifyContent: 'space-between'
    },
    text: {
        fontFamily: 'roboto-bold',
        fontSize: 20,
        color: 'red'
    },
    smalltext: {
        fontFamily: 'roboto-medium',
        fontSize: 18,
        color: 'gray'
    },
    location:{ flexDirection: 'row',
     justifyContent: 'space-between', 
     marginTop: 40 ,
     alignItems:'center'
    }

})