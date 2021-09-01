import { styles } from 'ansi-colors';
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Dimensions, StyleSheet, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'
const ENTRIES1 = [
    {
        profile: require("../images/2.png"),
    },
    {
        profile: require("../images/3.png"),
    },
    {
        profile: require("../images/4.png"),
    },
];

const { width: screenWidth } = Dimensions.get("window");

const Inquiry = () => {
    const [entries, setEntries] = useState([]);
    const carouselRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setEntries(ENTRIES1);
    }, []);

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


    return (
        
     
        <View style={{ marginTop: hp(4), flex: 1 }}>
            <Carousel
                layout="default"
                containerCustomStyle={{ height: 10, marginTop: hp(-25) }}
                ref={carouselRef}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth - 40}
                itemWidth={screenWidth}
                data={entries}
                renderItem={renderItem}
                onSnapToItem={(index) => {
                    console.log("index", index);
                    setActiveIndex(index);
                }}
            />
            <View style={{}}>
                {pagination()}
            </View>

            <View style={style.book}>
                <Text style={{ fontFamily:'Roboto-Bold',fontSize:30,color:'green',marginLeft:30,marginTop:40}}>Book Your Dream Villa</Text>
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
    book:{
        flex:1,
       
       
    },
  
});

export default Inquiry;