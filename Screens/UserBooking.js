import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, FlatList } from 'react-native'
import Header from '../components/Header'
import Colors from '../assets/colors/color'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from '../axios'
import LinearGradient from 'react-native-linear-gradient'
import { useIsFocused } from '@react-navigation/native'
import Button from '../components/Button'
import { set } from 'react-native-reanimated'
import BookingSlab from '../components/BookingSlab'
import { ScrollView } from 'react-native-gesture-handler'


const UserBooking = (props) => {
    const isFocused = useIsFocused();
    const [isLoader, setisLoader] = useState(false)
    const [DataAvailable, setDataAvailable] = useState(false)
    const [UserDetail, setUserDetail] = useState([])

    useEffect(() => {
        if (isFocused) {
            submitDate()
            // console.warn("dsfsdfsf",UserDetail)
        }
    }, [isFocused])


    const submitDate = async () => {
        setisLoader(true)
        const token = await AsyncStorage.getItem('tokenvalue')


        await axios.get('/BookingFatch', { headers: { 'Authorization': token } }).then((res) => {
            console.log("Ressss-----", res)
            if (res.status === 200) {
                console.log("====", res.data)
                //Alert.alert("success", res?.data?.msg)
                setUserDetail(res.data.bookingDetail)
                console.log("=====333=3=3=", UserDetail)
                setDataAvailable(true)
                setisLoader(false)
            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            // Alert.alert("Error", err?.response?.data?.error)
            setDataAvailable(false)
            setisLoader(false)
        });
    }





    const DeleteData = async (id) => {
        setisLoader(true)
        const token = await AsyncStorage.getItem('tokenvalue')
      console.log("==111111111",id);

        await axios.delete(`/deletebooking/${id}`,{ headers: { 'Authorization': token }}).then((res) => {    
            let data = res?.data?.DeleteBooking;
            if (res.status === 200) {

                //   Alert.alert("success", `your ${data.indate} TO ${data.outdate} is ${res?.data?.msg}`)
                let index = UserDetail.findIndex((item) => item._id === data._id);
                if (index !== -1) {  
                    let data1 = [...UserDetail]
                    data1.splice(index, 1);
                    setUserDetail(data1);
                }
                setisLoader(false)
            }
        }).catch((err) => {
            console.log("errr-----------", err);
            console.log("errr-------99999----", err.response);
            Alert.alert("Error", err?.response?.data?.error)
            setisLoader(false)

        });
    }


    return (
        <View style={styles.container}>
            <Header title='User Booking' navigation={props.navigation} />

            <View style={styles.secondContainer}>
                {isLoader ? <ActivityIndicator color={'Green'} size={100} /> :
                    DataAvailable ?
                        <FlatList
                            data={UserDetail}
                            keyExtractor={(item, index) => 'key' + index}
                            scrollEnabled
                            scrollEventThrottle={16}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item }) => {
                                return <BookingSlab item={item} onPress={() => { DeleteData(item._id) }} />
                            }}

                        />

                        :
                        <View style={styles.thirdContainer}>
                            <Text style={styles.text}>User Booking Not Available</Text>
                        </View>
                }

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