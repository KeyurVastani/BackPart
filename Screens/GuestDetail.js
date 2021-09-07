import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import TextBox from '../components/TextBox'
import axios from '../axios'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Button from '../components/Button'
import Colors from '../assets/colors/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { set } from 'react-native-reanimated'


const GuestDetail = (props) => {

    const [email, setemail] = useState("")
    const [userdata, setuserdata] = useState({})
    const [LoginuserEmail, setLoginuserEmail] = useState('')
    const [GuestButton, setGuestButton] = useState(true)
    const [BookingDetail, setBookingDetail] = useState(false)
    const [Message, setMessage] = useState(false)

    const loginUser = useSelector(state => state.loginReducer)
    const isFocused = useIsFocused();

    useEffect(() => {
        setLoginuserEmail(loginUser?.user?.data?.email)
    }, [loginUser])

    useEffect(() => {
        if (isFocused) {
            setuserdata({})
            setBookingDetail(false)
            setMessage(false)

            AsyncStorage.getItem('tokenvalue').then((res) => {
                if (res) {
                    // console.warn("res", res);
                    setGuestButton(false)

                }
            }).catch((err) => {
                console.log("err", err);
            });

        }
    }, [isFocused])


    const submitEmail = async () => {
        const dateReg = {
            "useremail": GuestButton ? email : LoginuserEmail
        }

        console.log("registered", dateReg)
        await axios.post('/BookingFatch', dateReg).then((res) => {
            console.log("Ressss-----", res)
            if (res.status === 200) {
                Alert.alert("Success", res?.data?.msg)
                setuserdata(res?.data?.bookdata)
                setBookingDetail(true)
            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
            setMessage(true)
        });

    }
    return (

        <View style={styles.container}>
            <Header navigation={props.navigation} title="       Booking Detail" />
            <View style={styles.secondContainer}>
                {GuestButton ?
                    <View style={{ margin: 10 }}>
                        <TextBox title={'Email'} onChangeText={text => setemail(text)} />

                        <View>
                            <TouchableOpacity onPress={() => submitEmail()}>
                                <Text style={styles.search}>Search Booking Detail</Text>
                            </TouchableOpacity>
                        </View>
                    </View> :
                    <View>
                        <TouchableOpacity onPress={() => submitEmail()}>
                            <Text style={styles.search}>Press For Your Booking Detail</Text>
                        </TouchableOpacity>
                    </View>}


                {BookingDetail && <View>
                    <View>
                        <Text style={styles.BookingHeading}> Your Booking Detail</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>indate:  {userdata.indate}</Text>
                        <Text style={styles.text}>outdate: {userdata.outdate}</Text>
                        <Text style={styles.text}>name:    {userdata.username}</Text>
                        <Text style={styles.text}>email:   {userdata.useremail}</Text>
                        <Text style={styles.text}>member:  {userdata.totalmember}</Text>
                    </View>
                    {/* <View style={{ marginTop: 70 }}>
                        <Button onpress={() => console.warn("sdfsdfsf")} title='Cancle Your Booking' />
                    </View> */}
                </View>}
                {Message && <View style={styles.bookContainer}>
                    <Text style={styles.bookingText}>Booking Detail is not Available</Text>
                </View>}



            </View>
        </View>

    )
}

export default GuestDetail


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainColor
    },
    text: {
        fontFamily: 'roboto-bold',
        fontSize: 30,
        color: "#fbb034",
        justifyContent: 'center', margin: 10
    },
    search: {
        fontSize: 20,
        margin: 20,
        marginHorizontal: 70,
        color: 'red'

    }, BookingHeading: {
        fontSize: 40,
        fontFamily: 'roboto-bold',
        color: '#6ec1e4'
    },
    secondContainer: {
        backgroundColor: 'white',
        flex: 1
    },
    bookContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'

    }, bookingText: {
        fontSize: 30
    }

})