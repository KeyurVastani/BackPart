import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Touchable, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import dayjs from 'dayjs';
import axios from '../axios'
import moment from 'moment';

import { useSelector,useDispatch } from 'react-redux';
import { setInDate,setOutDate } from '../store/action/DateAction';





// Fontisto.loadFont()
const DateAvailable = ({ navigation }) => {

    // const{indate,outdate} = useSelector(state=> state.dateReducer)
    const dispatch=useDispatch()
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
        dispatch(setOutDate(CheckOutDate))
        setcalenderOutShow(false)

    }
    const DateInConform = (dayObj) => {
        setCheckInDate(dayjs((`${dayObj.year}-${dayObj.month}-${dayObj.day}`).toString()).format('YYYY-MM-DD'))
        dispatch(setInDate(CheckInDate))
        setcalenderShow(false)

    }

    const submitDate = async () => {
        setdisable(false);
        setLoader(true);
        const dateReg = {
            indate: CheckInDate,
            outdate: CheckOutDate

        }
        debugger

        console.log("registered", dateReg)
        await axios.post('/booking', dateReg).then((res) => {
            debugger

            console.log("Ressss-----", res)
            if (res.status === 200) {
                setLoader(false);
                Alert.alert("success", res?.data?.msg)
                setdisable(true)
                debugger
            }
        }).catch((err) => {
            debugger
            setLoader(false);
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
            setdisable(false)

        });

    }






    return (


        <View style={{ marginTop: 10 }}>
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
                    {isLoader ?
                        <ActivityIndicator color={'red'} size={30} />
                        : <Text style={styles.textbutton}> Check Availabity</Text>

                    }

                </TouchableOpacity>
            </View>



            {/* Continue to booking */}
            {isdisabled &&
                <View style={styles.button} >
                    <TouchableOpacity onPress={() => navigation.navigate("Member", { date1: CheckInDate, date2: CheckOutDate })} >
                        <Text style={styles.textbutton}> Continue to Booking Member</Text>
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
    button: {
        alignItems: 'center',
        justifyContent: 'center', height: 40, borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
    }
})






