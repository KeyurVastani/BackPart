import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment-timezone'




const WeatherItem = ({ title, value, unit }) => {
    return (
        <View style={styles.weatherItem}>
            <View>
                <Text style={styles.weatherItemTitle}>{title}</Text>
            </View>
            <View>
                <Text style={styles.weatherItemTitle}>{value}{unit}</Text>
            </View>
        </View>
    )
}

const DateTime = ({ current, lat, lon, timezone }) => {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')

   
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                <View style={styles.weatherItemContainer}>
                    <WeatherItem title="Humidity" value={current ? current.humidity : ""} unit=" %" />
                    <WeatherItem title="Pressure" value={current ? current.pressure : ""} unit=" hPA" />
                    <WeatherItem title="Sunrise" value={current ? moment.tz(current.sunrise * 1000, timezone).format('LT') : ""}  />
                    <WeatherItem title="Sunset" value={current ? moment.tz(current.sunset * 1000, timezone).format('LT') : ""}  />
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1.5,
        flexDirection: "row",
        //justifyContent: 'space-between',
        padding: 15,
        alignItems: 'center', justifyContent: 'center'
    },
    heading: {
        fontSize: 45,
        color: 'white',
        fontWeight: '100'
    },
    subheading: {
        fontSize: 25,
        color: '#eee',
        fontWeight: '300'
    },
    rightAlign: {
        textAlign: 'right',
        marginTop: 20
    },
    timezone: {
        fontSize: 20,
        color: 'white'
    },
    latlong: {
        fontSize: 16,
        color: 'white',
        fontWeight: '700'
    },
    weatherItemContainer: {
        backgroundColor: "#18181b99",
        borderRadius: 10,
        padding: 30,
        marginTop: 10,
        justifyContent: 'center', alignSelf: 'center'
    },
    weatherItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    weatherItemTitle: {
        color: '#eee',
        fontSize: 18,
        fontFamily: 'roboto-Medium',
        justifyContent: 'space-between',
        width: 100


    }
})

export default DateTime