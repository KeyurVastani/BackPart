import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Touchable, Image, TouchableOpacity, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient'


import dayjs from 'dayjs';
import axios from '../axios'
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { setInDate, setOutDate } from '../store/action/DateAction';

const windowHeight = Dimensions.get('window').height;





// Fontisto.loadFont()
const DateAvailable = ({ navigation }) => {

    // const data = useSelector(state=> state.dateReducer)
    const dispatch = useDispatch()
    const [CheckInDate, setCheckInDate] = useState('')
    const [CheckOutDate, setCheckOutDate] = useState('')
    const [isCalenderShow, setcalenderShow] = useState(false)
    const [isCalenderOutShow, setcalenderOutShow] = useState(false)
    const [isdisabled, setdisable] = useState(false)
    const [isLoader, setLoader] = useState(false)
    const today = moment().format("YYYY-MM-DD");

    useEffect(() => {

        setdisable(false)
    }, [CheckInDate, CheckOutDate])




    const DateOutConform = (dayObj) => {

        setCheckOutDate(dayjs((`${dayObj.year}-${dayObj.month}-${dayObj.day}`).toString()).format('YYYY-MM-DD'))
        setcalenderOutShow(false)
     

    }
    const DateInConform = (dayObj) => {
        setCheckInDate(dayjs((`${dayObj.year}-${dayObj.month}-${dayObj.day}`).toString()).format('YYYY-MM-DD'))
       

        setcalenderShow(false)
   

    }

    const submitDate = async () => {
        setdisable(false);
        setLoader(true);
        const dateReg = {
            indate: CheckInDate,
            outdate: CheckOutDate

        }
       


        dispatch(setInDate(CheckInDate))
        dispatch(setOutDate(CheckOutDate))




        console.log("registered", dateReg)
        await axios.post('/booking', dateReg).then((res) => {


            console.log("Ressss-----", res)
            if (res.status === 200) {
                setLoader(false);
                Alert.alert("success", res?.data?.msg)
                setdisable(true)

            }
        }).catch((err) => {

            setLoader(false);
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
            setdisable(false)

        });

    }






    return (

        <View style={styles.container}>
            <View style={styles.thirdCont}>
                <Text style={styles.text}>Book Your Date</Text>
            </View>

            <View style={styles.secondContainer}>
                <View style={styles.villaContainer}>
                    <Image style={styles.imagevilla} source={require('../images/beach.png')} />
                </View>
                <View style={styles.indateContainer}>
                    <Text style={styles.secondText}>In Date</Text>
                    <TouchableOpacity style={styles.textbox} onPress={() => { setcalenderShow(!isCalenderShow) }}>
                        <Text style={styles.text1} >{CheckInDate}</Text>
                    </TouchableOpacity>
                </View>
                {
                    isCalenderShow && <Calendar
                        minDate={today}
                        style={{ marginTop: 10 }}
                        onDayPress={(dayObj) => {
                            DateInConform(dayObj)
                        }}

                        markedDates={{
                            [CheckInDate]: { selected: true, marked: true, selectedColor: 'blue' },
                        }}
                    />
                }

                {/* =============Out date =========== */}
                <View style={[styles.indateContainer, { marginTop: 20 }]}>
                    <Text style={styles.secondText}>Out Date</Text>
                    <TouchableOpacity style={styles.textbox} onPress={() => { setcalenderOutShow(!isCalenderOutShow) }}>
                        <Text style={styles.text1}>{CheckOutDate}</Text>
                    </TouchableOpacity>
                </View>
                {
                    isCalenderOutShow && <Calendar
                        minDate={today}
                        style={{ marginTop: 10 }}
                        onDayPress={(dayObj) => {
                            DateOutConform(dayObj)
                        }}

                        markedDates={{
                            [CheckOutDate]: { selected: true, marked: true, selectedColor: 'blue' },

                        }} />
                }
                <View style={styles.button} >
                    <TouchableOpacity onPress={() => { submitDate() }}>
                        <LinearGradient

                            colors={['#ffdd00', '#fbb034']}
                            style={styles.button1}>
                            {isLoader ?
                                <ActivityIndicator color={'red'} size={30} />
                                : <Text style={styles.textbutton}> Check Availabity</Text>

                            }
                        </LinearGradient>


                    </TouchableOpacity>
                </View>
                {isdisabled &&
                    <View style={[styles.button, { marginTop: 25 }]} >
                        <TouchableOpacity onPress={() => navigation.navigate("Member", { date1: CheckInDate, date2: CheckOutDate })} >
                            <LinearGradient
                                colors={['#ffdd00', '#fbb034']}
                                style={styles.button1}>
                                {isLoader ?
                                    <ActivityIndicator color={'red'} size={30} />
                                    : <Text style={styles.textbutton}> Continue to Booking </Text>

                                }
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>}
            </View>
        </View>

    )
}

export default DateAvailable

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "lightblue",
    },
    secondContainer: {
        backgroundColor: 'white',
        height: windowHeight * .73,
        margin: 10,
        marginTop: 10,
        borderTopStartRadius: 200,
        borderTopRightRadius: 200,
        borderBottomEndRadius: 40,
        borderBottomLeftRadius: 40

    }, thirdCont: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 40,
        fontFamily: 'roboto-bold',
        color: 'green'
    },


    textbutton: {
        fontSize: 20
    },

    button1: {
        marginTop: 30,
        height: 50,
        width: 300,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 50,
        marginTop: 40
    },
    textbox: {
        fontSize: 23,
        marginRight: 5,
        borderWidth: 2,
        width: 150,
        height: 40,
        borderRadius: 9,
        padding: 5,
        backgroundColor: 'lightblue'
    },
    secondText: {
        fontSize: 30,
        fontFamily: 'Roboto-bold',
    },
    imagevilla: {
        height: 200,
        width: 200,

    },
    villaContainer: {
        marginTop: 13,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    indateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // backgroundColor: 'red',
        paddingHorizontal: 20,
        paddingVertical: 10,

    },
    text1: {
        fontSize: 23,
        padding: 1,

    }
})






