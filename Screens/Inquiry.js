import { styles } from 'ansi-colors';
import React, { useEffect, useState, useRef } from 'react'
import { View, Text, Dimensions, StyleSheet, Image ,TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'
import Color from '../assets/colors/color'

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

const Inquiry = ({navigation}) => {
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
                <Text style={style.text}>Book Your Dream Villa</Text>
                <View style={style.button} >
                    <TouchableOpacity onPress={() => { navigation.navigate("DateAvailable") }}>
                        <Text style={style.textbutton}> Check The Availabity</Text>
                    </TouchableOpacity>
                </View>
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
    text:{ 
        fontFamily:'Roboto-Bold',
        fontSize:30,
        color:Color.green,
        marginLeft:30,
        marginTop:40
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
  
});

export default Inquiry;