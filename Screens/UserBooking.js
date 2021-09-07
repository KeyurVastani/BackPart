import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import Header from '../components/Header'
import Colors from '../assets/colors/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../axios'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused } from '@react-navigation/native'
import Button from '../components/Button'


const UserBooking = (props) => {
    const isFocused = useIsFocused();
    const [isLoader, setisLoader] = useState(false)
    const [DataAvailable, setDataAvailable] = useState(false)
    const [UserDetail, setUserDetail] = useState({})

    useEffect(() => {
        if (isFocused) {
            submitDate()
        }
    }, [isFocused])


    const submitDate = async () => {
        setisLoader(true)
        const token = await AsyncStorage.getItem('tokenvalue')


        await axios.get('/BookingFatch', { headers: { 'Authorization': token } }).then((res) => {
            console.log("Ressss-----", res)
            if (res.status === 200) {
                Alert.alert("success", res?.data?.msg)
                setUserDetail(res.data.bookingDetail)
                setDataAvailable(true)
                setisLoader(false)
            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
            setDataAvailable(false)
            setisLoader(false)
        });
    }



    const DeleteBook = async () => {
        setisLoader(true)
        const token = await AsyncStorage.getItem('tokenvalue')


        await axios.delete('/deletebooking', { headers: { 'Authorization': token } }).then((res) => {
            console.log("Ressss-----", res)
            if (res.status === 200) {
                Alert.alert("success", `your ${UserDetail.indate} TO ${UserDetail.outdate} is ${res?.data?.msg}`)

            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)

        });
    }


    return (
        <View style={styles.container}>
            <Header title='User Booking' navigation={props.navigation} />
            <View style={styles.secondContainer}>
                {isLoader ? <ActivityIndicator color={'Green'} size={100} /> :
                    DataAvailable ? <View>
                        <Text>{UserDetail.username}</Text>
                        <Text>{UserDetail.indate}</Text>
                        <Text>{UserDetail.outdate}</Text>
                        <Text>{UserDetail.useremail}</Text>

                        <View style={{ marginTop: 600 }}>
                            <Button onpress={() => DeleteBook()} title='Cancle Your Booking' />
                        </View>
                    </View>
                        :
                        <View style={styles.thirdContainer}>
                            <Text style={styles.text}>User Booking Not Available</Text>
                        </View>}




            </View>
        </View>
    )
}

export default UserBooking



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.mainColor
    },
    secondContainer: {
        backgroundColor: 'white',
        flex: 1,

    },
    thirdContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    text: {
        fontFamily: 'roboto-medium',
        fontSize: 30,
        color: Colors.mainColor

    }

})