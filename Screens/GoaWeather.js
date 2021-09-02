import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, SafeAreaView } from 'react-native'
import DateTime from '../components/DateTime'
import WeatherScroll from '../components/WeatherScroll'


const GoaWeather = () => {
    const API_KEY ="372b10a48059f97add26ea71d6f742e9" 
    const [data, setData] = useState({})

  
    useEffect(() => {
        (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            fetchDataFromApi("40.7128", "-74.0060")
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
          fetchDataFromApi(location.coords.latitude, location.coords.longitude);
        })();
      }, [])
    
      const fetchDataFromApi = (latitude, longitude) => {
        if(latitude && longitude) {
          fetch(`https://api.openweathermap.org/data/2.5/onecall?lat={latitude}&lon={longitude}&appid={API_KEY}`).then(res => res.json()).then(data => {
    
           console.log("vsdfDSfsaf=======",data)
          setData(data)
          })
        }
      }
    return (

        <View style={styles.container}>

            <DateTime />
            <WeatherScroll />

        </View>

    )
}

export default GoaWeather

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#009387',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center'
    }
})
