
import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'

import Colors from '../assets/colors/color'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import LinearGradient from 'react-native-linear-gradient'

import axios from '../axios'
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'

const LastBill = (props) => {
    const [GuestButton, setGuestButton] = useState(true)
    const data = useSelector((state) => state.dateReducer)
    const user = useSelector((state) => state.loginReducer)
    // console.log("===============",indate)
    // const date1 = props?.route?.params?.date1

    // const date2 = props?.route?.params?.date2
    const total = props?.route?.params?.member

    const daysDiff = () => {
        var date1 = new Date(data.indate);
        var date2 = new Date(data.outdate);
        var Difference_In_Time = date2.getTime() - date1.getTime();
        return (Difference_In_Time / (1000 * 3600 * 24))
    }



    useEffect(() => {

        AsyncStorage.getItem('tokenvalue').then((res) => {
            if (res) {
                // console.warn("res", res);
                setGuestButton(false)
                

            }
        }).catch((err) => {
            console.log("err", err);
        });

    }, [])



    const submitDate = async () => {
     
        const d= daysDiff()

        const dateReg = {
            indate: data.indate,
            outdate: data.outdate,
            username: user?.user?.data?.name,
            useremail: user?.user?.data?.email,
            totalmember: total,
            totalamount: total * 1000 * d,
            totaldays: d ,
            createdBy: user?.user?.data?._id

        }


        // console.warn("final======", dateReg)
        await axios.post('/finalBooking', dateReg).then((res) => {

            console.log("Ressss-----", res)
            if (res.status === 200) {
                Alert.alert("success", res?.data?.msg)
                props.navigation.popToTop()
            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
        });

    }



    // console.log("prospsssss --", props?.route?.params?.date1)
    return (
        <View style={{ flex: 1, backgroundColor: Colors.mainColor }}>


            <View style={{ justifyContent: 'center', alignItems: "center", marginTop: "20%" }}>

                <View style={styles.container}>

                    {/* first    ==============        */}
                    <View style={{ borderBottomWidth: 1, borderColor: "#A999AF", justifyContent: 'center', alignItems: 'center', height: 90 }}>
                        {GuestButton ? <Text style={{ fontSize: 20 }}>Guest</Text> : <Text style={{ fontSize: 20 }}>{user?.user?.data?.name}</Text>}
                        <Text style={{ fontSize: 20 }}> {data.indate}  TO {data.outdate}</Text>
                    </View>


                    {/* second =====================*/}
                    <View style={{ marginHorizontal: 10 }}>
                        {/* first-------------------- */}
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                            <View style={{ marginTop: 20 }}>
                                <Text style={{ fontSize: 20 }}>The dirving Park</Text>
                                <Text style={{ fontSize: 20 }}>this is a beautiful park</Text>
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
                                <Text style={styles.text}>DAYS</Text>
                                <Text style={styles.smalltext}>{daysDiff()}</Text>
                            </View>

                            <View style={{ flex: 0.1 }} />

                            <View style={[styles.insideCont]}>
                                <Text style={styles.text}>PRICE</Text>
                                <Text style={styles.smalltext}>$ {total * 1000 * daysDiff()}</Text>
                            </View>
                        </View>


                        <View style={styles.location}>
                            <View >
                                <EvilIcons
                                    name="location"
                                    size={40} />
                            </View>
                            <View >
                                <Text style={{ fontSize: 15 }}> The DivinePark,E-582,Greate Kailash-2, Goa</Text>
                            </View>
                        </View>

                        <View style={{ marginTop: 50, alignItems: 'center', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => props.navigation.popToTop()}  >
                                <Text style={[styles.text, { fontFamily: 'roboto-medium' }]}>Cancle Booking</Text>
                            </TouchableOpacity>
                        </View>
                    </View>






                    {GuestButton ?
                        <View style={{ paddingHorizontal: 35, marginTop: 40 }}>
                            <TouchableOpacity
                                style={styles.button}
                                color="red"
                                onPress={() => props.navigation.navigate("BookGuest", {
                                    member: total,
                                    days:daysDiff()
                                   
                                })}>
                                <LinearGradient
                                    colors={['#77A1D3', '#79CBCA']}
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>{'Book As a Guest'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View> :
                        <View style={{ paddingHorizontal: 35, marginTop: 40 }}>
                            <LinearGradient
                                colors={['#77A1D3', '#79CBCA']}
                                style={styles.button}>
                                <Text style={styles.buttonText}>{'Book As a Guest'}</Text>
                            </LinearGradient>
                        </View>
                    }





                    {GuestButton ?

                        <View style={{ paddingHorizontal: 35, marginTop: 20 }}>
                            <TouchableOpacity
                                style={styles.button}
                                color="red"
                                onPress={() => {
                                    props.navigation.navigate("SignInScreen")

                                }}>
                                <LinearGradient
                                    colors={['#ffdd00', '#fbb034']}
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>{'Book As a User'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        :
                        <View style={{ paddingHorizontal: 35, marginTop: 20 }}>

                            <TouchableOpacity
                                style={styles.button}
                                color="red"
                                onPress={() => {
                                    submitDate()

                                }}>
                                <LinearGradient
                                    colors={['#ffdd00', '#fbb034']}
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>{'Book As a User'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    }

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
    location: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 40,
        alignItems: 'center'
    },
    bottomButton: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3172b',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 10
    },
    button: {
        marginTop: 30,
        height: 50,
        width: 300,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',

    },
    buttonText: {
        color: '#009387',
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'roboto-Medium',
    },

})