import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Dimensions, Alert, ActivityIndicator } from 'react-native'
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import LinearGradient from 'react-native-linear-gradient'
import { CalTheme } from '../data/CalenderThem';


import dayjs from 'dayjs';
import axios from '../axios'
import moment from 'moment';

import { useSelector, useDispatch } from 'react-redux';
import { setInDate, setOutDate } from '../store/action/DateAction';
import { back } from 'react-native/Libraries/Animated/Easing';
import SquareButton from '../components/SquareButton';
import Colors from '../assets/colors/color'
import color from '../assets/colors/color';

const windowHeight = Dimensions.get('window').height;





// Fontisto.loadFont()
const DateAvailable = ({ navigation }) => {

    const dateobj = useSelector(state => state.dateReducer)

    const dispatch = useDispatch()
    const [CheckInDate, setCheckInDate] = useState('')
    const [CheckOutDate, setCheckOutDate] = useState('')
    const [isCalenderShow, setcalenderShow] = useState(false)
    const [isCalenderOutShow, setcalenderOutShow] = useState(false)
    const [isdisabled, setdisable] = useState(false)
    const [isLoader, setLoader] = useState(false)
    const today = moment().format("YYYY-MM-DD");
    console.log("========", dateobj);
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
        if (CheckInDate.length == 0 && CheckOutDate == 0) {
            return Alert.alert("Alert", "enter check in date or check out date")
        }

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

        <ScrollView style={styles.container} bounces="false">
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
                        disableAllTouchEventsForDisabledDays={true}

                        theme={CalTheme}
                        onDayPress={(dayObj) => {
                            DateInConform(dayObj)
                        }}

                        // markedDates={{
                        //     [CheckInDate]: { selected: true, marked: true, selectedColor: 'blue' },
                        // }}
                        markedDates={dateobj.dateobj}
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
                        minDate={CheckInDate}
                        disableAllTouchEventsForDisabledDays={true}

                        theme={CalTheme}
                        onDayPress={(dayObj) => {
                            DateOutConform(dayObj)
                        }}

                        // markedDates={{
                        //      [CheckOutDate]: { selected: true, marked: true, selectedColor: 'blue' },
                        // }}
                        markedDates={dateobj.dateobj}
                    />
                }
                <View style={styles.button} >

                    <SquareButton onPress={() => { submitDate() }} touchStyle={{ width: 300, borderColor: Colors.signInBlue }}>
                        {isLoader ?
                            <ActivityIndicator color={'red'} size={30} />
                            : <Text style={styles.textbutton}> Check Availabity</Text>

                        }
                    </SquareButton>

                </View>
                {isdisabled &&
                    <View style={[styles.button, { marginTop: 0 }]} >

                        <SquareButton onPress={() => navigation.navigate("Member",
                            // { date1: CheckInDate, date2: CheckOutDate }  //props pass
                        )} touchStyle={{ width: 300, backgroundColor: Colors.signInBlue }}>
                            {isLoader ?
                                <ActivityIndicator color={'red'} size={30} />
                                : <Text style={[styles.textbutton, { color: 'white', fontSize: 23 }]}> Continue to Booking </Text>

                            }

                        </SquareButton>
                    </View>}
            </View>
        </ScrollView>

    )
}

export default DateAvailable

const styles = StyleSheet.create({

    secondContainer: {
        backgroundColor: 'lightblue',
        height: windowHeight * .75,
        margin: 10,
        marginTop: 0,
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
        fontSize: 25,
        color: Colors.signInBlue,
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
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        top: 45,
        //  backgroundColor: 'red'
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
        color: Colors.signInBlue
    },
    imagevilla: {
        height: 200,
        width: 200,

    },
    villaContainer: {

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

    },
    container: {
        flex: 1,


    },
})






