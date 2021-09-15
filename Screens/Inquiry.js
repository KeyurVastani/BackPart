import { styles } from 'ansi-colors';
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'
import Color from '../assets/colors/color'
import moment from 'moment';
import axios from '../axios';
import Button from '../components/Button'
import { Calendar } from 'react-native-calendars';
import LongRouButton from '../components/LongRouButton';
import { useIsFocused } from '@react-navigation/native';
import RNCalendarEvents from "react-native-calendar-events";


const ENTRIES1 = [
    {
        profile: require("../images/5.jpg"),
    },
    {
        profile: require("../images/3.png"),
    },
    {
        profile: require("../images/4.png"),
    },
    {
        profile: require("../images/6.jpg"),
    },
    {
        profile: require("../images/8.jpg"),
    },
    {
        profile: require("../images/9.jpg"),
    },
];

const { width: screenWidth } = Dimensions.get("window");


// function call
const getDaysBetweenDates = (startDate, endDate) => {
    var now = startDate.clone(), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('YYYY-MM-DD'));
        now.add(1, 'days');
    }

    return dates;
};


const Inquiry = ({ navigation }) => {
    const isFocused = useIsFocused()
    const today = moment().format("YYYY-MM-DD");
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [date, setDate] = useState([]);
    const [newDaysObject, setnewDaysObject] = useState({});

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);

 

   

    useEffect(() => {

        if (isFocused) {
            console.log("new object is==", newDaysObject)
            setDate([])
            console.log("empty st=====", date)
            callApi()
            console.log("========call api")
        }
    }, [isFocused])


    const pagination = () => {
        return (
            <Pagination
                dotsLength={entries.length}
                activeDotIndex={activeIndex}
                containerStyle={{ marginTop: hp(-10) }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: "black",
                }}
                dotContainerStyle={{
                    paddingTop: -10
                }}
                inactiveDotStyle={
                    {
                        // Define styles for inactive dots here
                    }
                }
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    };


    const renderItem = ({ item, index }) => {
        return (
            <View style={{ height: hp(30), width: screenWidth }}>
                <Image source={item.profile} style={style.image} />
            </View>

        )

    }

    //get aPi
    const callApi = async () => {

        await axios.get('/booking').then((res) => {
            let data = res?.data?.bookdate;
            // console.log("=======", res?.data?.bookdate)
            const dataList = data.map((item) => {

                const startDate = moment(item.indate);
                const endDate = moment(item.outdate);

                return getDaysBetweenDates(startDate, endDate)

            });


            // console.log("DataList====", dataList)
            for (let i = 0; i < dataList.length; i++) {

                var innerArrayLength = dataList[i].length;

                for (let j = 0; j < innerArrayLength; j++) {
                    date.push(dataList[i][j]);
                }


            }


            // console.log("setstatsd========", date)

            var newDaysObjects = {}
            date.map((day) => {
                // console.log("sdsadfsad121312312312312===", day)
                newDaysObjects = {
                    ...newDaysObjects,

                    [day]: { selected: true, marked: true, selectedColor: '#2acaea' },
                };


            });
            setnewDaysObject(newDaysObjects)


        }).catch((err) => {

            // console.log("errr-----------", err);
            alert(err?.response?.data?.error)
        });
    }








    return (


        <View style={{ marginTop: hp(4), flex: 1 }}>
            <Carousel
                autoplay={true}
                autoplayInterval={3000}
                loop={true}
                layout="default"
                containerCustomStyle={{ height: 10, marginTop: hp(-25) }}
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth - 40}
                itemWidth={screenWidth}
                data={entries}
                renderItem={renderItem}
                onSnapToItem={(index) => {
                    // console.log("index", index);
                    setActiveIndex(index);
                }}
            />
            <View style={{}}>
                {pagination()}
            </View>

            <View style={style.book}>
                <Text style={style.text}>Book Your Dream Villa</Text>
                {/* <Button title='Check The Availabity' onPress={() => {
                    navigation.navigate("DateAvailable")
                }} 
                /> */}
                <View style={{ marginVertical: 10 }}>
                    <LongRouButton title='Check The Availabity'
                        onPress={() => {
                            navigation.navigate("DateAvailable")
                        }} />
                </View>


                {
                    date.length >= 0 && <Calendar
                        minDate={today}
                        markedDates={newDaysObject}
                    />
                }

            </View>
        </View>


    )
}




const style = StyleSheet.create({
    container: {
        backgroundColor: "green",
        paddingHorizontal: wp(5),
        marginBottom: wp(10),
    },
    item: {
        width: screenWidth,
        backgroundColor: "black",
    },
    imageContainer: {
        marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
        backgroundColor: "white",
        borderRadius: 8,
    },
    image: {
        height: 620,
        width: screenWidth,
        resizeMode: "contain",
    },
    book: {
        flex: 1
    },
    text: {
        fontFamily: 'Roboto-Bold',
        fontSize: 35,
        color: Color.green,
        marginLeft: 30,
        marginTop: 0
    },
    textbutton: {
        fontSize: 28
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center', height: 40, borderRadius: 20,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 10,
    }

});

export default Inquiry;