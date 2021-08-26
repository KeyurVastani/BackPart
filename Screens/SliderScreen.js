import React from 'react'
import { View, Text } from 'react-native'
import Carousel from '../components/carousel'
import { dummyData } from '../data/Data'

const SliderScreen = () => {
    return (
        <View>
            <Carousel data={dummyData} />
        </View>
    )
}

export default SliderScreen
