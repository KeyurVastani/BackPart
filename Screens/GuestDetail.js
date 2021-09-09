import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert, FlatList, ActivityIndicator } from 'react-native'
import TextBox from '../components/TextBox'
import axios from '../axios'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import Button from '../components/Button'
import Colors from '../assets/colors/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useIsFocused } from '@react-navigation/native'
import { set } from 'react-native-reanimated'
import BookingSlab from '../components/BookingSlab'
import LongRouButton from '../components/LongRouButton'


const GuestDetail = (props) => {

    const [email, setemail] = useState("")
    const [userdata, setuserdata] = useState([])

    const [GuestButton, setGuestButton] = useState(true)
    const [BookingDetail, setBookingDetail] = useState(false)
    const [Message, setMessage] = useState(false)
    const [isLoader, setisLoader] = useState(false)


    const isFocused = useIsFocused();



    useEffect(() => {
        if (isFocused) {
            setuserdata([])
            setBookingDetail(false)
            setMessage(false)
            setemail('')


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
        setisLoader(true)
        setMessage(false)

        const dateReg = {
            "useremail": email
        }


        await axios.post('/BookingFatch', dateReg).then((res) => {
            console.log("Ressss-----", res)
            if (res.status === 200) {
            // Alert.alert("Success", res?.data?.msg)

                setuserdata(res?.data?.bookdata)
                setBookingDetail(true)
                setMessage(false)
                setisLoader(false)

            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
            setMessage(true)
            setBookingDetail(false)
            setisLoader(false)
        });

    }
    return (

        <View style={styles.container}>
            <Header navigation={props.navigation} title="   Booking Detail" />
            <View style={styles.secondContainer}>

                <View style={{ margin: 10 }}>
                    <TextBox title={'Email'} onChangeText={text => setemail(text)} value={email} />
                    <View style={{ marginTop: 20 }}>
                        <LongRouButton title={'Search Booking Detail'} onPress={() => submitEmail()} />
                    </View>
                </View>


                {isLoader ? <ActivityIndicator color={'Green'} size={100} /> : BookingDetail &&
                    <FlatList
                        data={userdata}
                        keyExtractor={(item, index) => 'key' + index}
                        scrollEnabled
                        scrollEventThrottle={16}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => {
                            return <BookingSlab item={item} />
                        }}

                    />}


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