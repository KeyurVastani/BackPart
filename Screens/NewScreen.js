import React from 'react'
import { View, Text } from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
// Fontisto.loadFont()
const newScreen = () => {
    return (
        <View style={{ justifyContent: 'center', marginTop: 50 }}>

            <Text style={{ fontFamily: "KaiseiOpti-Bold" }}>dsfsdfsafsadfsdf</Text>
            <Text style={{ fontFamily: "KaiseiOpti-Bold" }}>Test</Text>

            <Fontisto name={'search'} size={25} color={'#f15454'} />


        </View>
    )
}

export default newScreen
