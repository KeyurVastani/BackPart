import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Touchable, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient'


import dayjs from 'dayjs';
import axios from '../axios'
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { setInDate, setOutDate } from '../store/action/DateAction';





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
        // dispatch(setOutDate(CheckOutDate))

    }
    const DateInConform = (dayObj) => {
        setCheckInDate(dayjs((`${dayObj.year}-${dayObj.month}-${dayObj.day}`).toString()).format('YYYY-MM-DD'))
        // console.warn("=============",CheckInDate)

        setcalenderShow(false)
        // dispatch(setInDate(CheckInDate))

    }

    const submitDate = async () => {
        setdisable(false);
        setLoader(true);
        const dateReg = {
            indate: CheckInDate,
            outdate: CheckOutDate

        }
        // console.warn("=============1",CheckInDate)
        // console.warn("============2",CheckOutDate)


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

        <View style={{ marginTop: 30 }}>
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 20, marginLeft: 5 }}>Select your check in date</Text>
                    <TouchableOpacity onPress={() => { setcalenderShow(!isCalenderShow) }}>
                        <Text style={{ fontSize: 20, marginRight: 5, borderWidth: 1, width: 150, height: 30 }}>{CheckInDate}</Text>
                    </TouchableOpacity>
                </View>

                {
                    isCalenderShow && <Calendar
                        minDate={today}
                        style={{ marginTop: 10 }}
                        onDayPress={(dayObj) => {
                            // console.warn("Date", dayjs((`${dayObj.year}-${dayObj.month}-${dayObj.day}`).toString()).format('YYYY-MM-DD'));
                            DateInConform(dayObj)
                            // console.warn("Type", typeof CheckInDate)
                        }}

                        markedDates={{
                            [CheckInDate]: { selected: true, marked: true, selectedColor: 'blue' },
                        }}
                    />
                }
            </View>

            {/* =================================================== */}
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                    <Text style={{ fontSize: 20, marginLeft: 5 }}>Select your check out date</Text>
                    <TouchableOpacity onPress={() => { setcalenderOutShow(!isCalenderOutShow) }}>
                        <Text style={{ fontSize: 20, marginRight: 5, borderWidth: 1, width: 150, height: 30 }}>{CheckOutDate}</Text>
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
                            // '2021-10-01': { selected: true, marked: true, selectedColor: 'blue' },
                            // '2021-10-02': { selected: true, marked: true, selectedColor: 'blue' }
                        }} />
                }

            </View>


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



            {/* Continue to booking */}
            {isdisabled &&
                <View style={styles.button} >
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


    )
}

export default DateAvailable

const styles = StyleSheet.create({
    dateselect: {
        height: 30,
        borderWidth: 2,
        width: 60
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
    }
})






