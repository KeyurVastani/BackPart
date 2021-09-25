import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Image } from 'react-native';
import DateTime from '../components/DateTime';
import WeatherScroll from '../components/WeatherScroll';
import Colors from '../assets/colors/color'
import Header from '../components/Header';
import ProgressLoader from 'rn-progress-loader';



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
                
                setWeatherData(data);
              
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
            <View
            style={{backgroundColor: "#06566e", justifyContent: 'center', alignItems: 'center', flex: 1}}>

            <ProgressLoader
            style={{height:40,width:20}}
            visible={!loaded}
            isModal={true} 
            isHUD={true}
            hudColor={"#fff"}
            color={"#000000"} 
            barHeight={64}/>
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
                <Image style={{ height: 110, width: 110, }} source={require('../images/weather3.png')} />
            </View>
            <DateTime current={weatherData.current} timezone={weatherData.timezone} />
            <WeatherScroll weatherData={weatherData.daily} />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#9CC3D5FF',
        justifyContent:'center',
        alignItems:'center'

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
        marginTop: 60,
        color: Colors.signInBlue
    }
});