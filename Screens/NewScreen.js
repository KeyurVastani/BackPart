import React, { useState } from 'react'
import { View, Text, SafeAreaView, Touchable, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import dayjs from 'dayjs';
import axios from '../axios'




// Fontisto.loadFont()
const newScreen = () => {
    const [CheckInDate, setCheckInDate] = useState('')
    const [CheckOutDate, setCheckOutDate] = useState('')
    const [isCalenderShow, setcalenderShow] = useState(false)
    const [isCalenderOutShow, setcalenderOutShow] = useState(false)

    const DateOutConform = (dayObj) => {
        setCheckOutDate(dayjs((`${dayObj.year}-${dayObj.month}-${dayObj.day}`).toString()).format('YYYY-MM-DD'))
        setcalenderOutShow(false)

    }
    const DateInConform = (dayObj) => {
        setCheckInDate(dayjs((`${dayObj.year}-${dayObj.month}-${dayObj.day}`).toString()).format('YYYY-MM-DD'))
        setcalenderShow(false)

    }

    // const submitDate = async () => {


    //     const dateReg = {
    //         indate: CheckInDate,
    //         outdate: CheckOutDate

    //     }
    //     debugger

    //     console.log("registered", dateReg)
    //     await axios.post('/booking', dateReg).then((res) => {
    //         debugger

    //         console.log("Ressss-----", res)
    //         if (res.status === 200) {
    //             Alert.alert("success",res?.data?.msg)
    //     debugger
    // }
    //     }).catch((err) => {
    //         debugger
    //         console.log("errr-----------", err.response);
    //         alert(err?.response?.data?.error)
    //     });

    // }






    return (
        <SafeAreaView>

            <View>
                <View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 20 }}>select your check in date</Text>
                        <TouchableOpacity onPress={() => { setcalenderShow(!isCalenderShow) }}>
                            <Text style={{ fontSize: 20, marginRight: 5, borderWidth: 1, width: 150, height: 30 }}>{CheckInDate}</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        isCalenderShow && <Calendar
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
                        <Text style={{ fontSize: 20 }}>select your check out date</Text>
                        <TouchableOpacity onPress={() => { setcalenderOutShow(!isCalenderOutShow) }}>
                            <Text style={{ fontSize: 20, marginRight: 5, borderWidth: 1, width: 150, height: 30 }}>{CheckOutDate}</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        isCalenderOutShow && <Calendar
                            style={{ marginTop: 10 }}
                            onDayPress={(dayObj) => {
                                DateOutConform(dayObj)
                            }}

                            markedDates={{
                                [CheckOutDate]: { selected: true, marked: true, selectedColor: 'blue' }
                            }} />
                    }

                </View>


                <View style={styles.button} >
                    <TouchableOpacity onPress={() =>console.warn("sdfsf")}>
                        <Text style={styles.textbutton}> Check The Availabity</Text>
                    </TouchableOpacity>
                </View>

            </View>

        </SafeAreaView>
    )
}

export default newScreen

const styles = StyleSheet.create({
    dateselect: {
        height: 30,
        borderWidth: 2,
        width: 60
    },
    textbutton: {
        fontSize: 20

    },
    button: {
        alignItems: 'center',
        justifyContent: 'center', height: 40, borderRadius: 20,
        width: "50%",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginLeft: 90,
        marginTop: 30,
    }
})


