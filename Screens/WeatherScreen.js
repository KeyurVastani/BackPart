import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import DateTime from '../components/DateTime';
import WeatherScroll from '../components/WeatherScroll';
import Color from '../assets/colors/color'
import Header from '../components/Header';



export default function WeatherScreen(props) {

    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    async function fetchWeatherData() {
        setLoaded(false);
        const API = "https://api.openweathermap.org/data/2.5/onecall?lat=15.2993&lon=74.1240&exclude=hourly,minutely&units=metric&appid=32ec2e8d49e7e9f94b2b0ecded91171b"
        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const data = await response.json();
                debugger
                setWeatherData(data);
                console.log("fsfsdfsdfs==============", data)
            } else {
                setWeatherData(null);
            }
            setLoaded(true);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData();
    }, [])


    if (!loaded) {
        return (
            <View style={styles.container}>
                <ActivityIndicator color='gray' size={36} />
            </View>

        )
    }

    else if (weatherData === null) {
        return (
            <View style={styles.container}>
                <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
            </View>
        )
    }

    return (

        <View style={styles.container}>
            <Header navigation={props.navigation} title="Weather" />
            <Text style={styles.text}>{"Goa's Weather"}</Text>
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <Image style={{ height: 90, width: 100, }} source={require('../images/WeatherImage.png')} />
            </View>
            <DateTime current={weatherData.current} timezone={weatherData.timezone} lat={weatherData.lat} lon={weatherData.lon} />
            <WeatherScroll weatherData={weatherData.daily} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.mainColor

        // alignItems: 'center',
        // justifyContent: 'center',
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    },
    text: {
        fontSize: 40,
        fontFamily: 'roboto-Medium',
        marginTop: 60, marginLeft: 60,
        color: Color.yellow
    }
});