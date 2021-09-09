import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, ImageBackground, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Colors from '../assets/colors/color'


const { width } = Dimensions.get('window');
const SPACING = 10;
const THUMB_SIZE = 80;

const Gallery = () => {

    const [images, setImages] = useState([
        { id: '1', image: require('../Gallery/1.jpeg') },
        { id: '2', image: require('../Gallery/2.jpeg') },
        { id: '3', image: require('../Gallery/3.jpeg') },
        { id: '4', image: require('../Gallery/4.jpeg') },
        { id: '5', image: require('../Gallery/5.jpeg') },
        { id: '6', image: require('../Gallery/6.jpeg') },
        { id: '7', image: require('../Gallery/7.jpeg') }
    ]);
    const [indexSelected, setIndexSelected] = useState(0);

    const onSelect = indexSelected => {
        setIndexSelected(indexSelected);
    };

    const ImagePost = ({ url }) => {
        return (
            <View>
                <Image style={styles.image} source={url} />
            </View>
        )
    }

    const TextPost = ({title}) => {
        return (
            <View style={{backgroundColor:'#E5E5E5'}}>
                <Text style={styles.text1}>{title}</Text>
            </View>
        )
    }

    return (
        <ScrollView   showsVerticalScrollIndicator={false} >
            <View>

                <View>
                    <ImageBackground source={require('../images/13.png')} resizeMode="cover"
                        style={styles.image}>
                        <Text style={styles.text}>Casa Sunshine View</Text>
                    </ImageBackground>
                </View>

                <View style={{ marginTop: 10 }}>
                    <TextPost title={'Bedroom one with bathroom with open shower'} />
                    <Carousel
                        layout='default'
                        data={images}
                        onSnapToItem={index => onSelect(index)}
                        sliderWidth={width}
                        itemWidth={width}
                        renderItem={({ item, index }) => (
                            <Image
                                key={index}
                                style={styles.image}
                                resizeMode='contain'
                                source={item.image}
                            />
                        )}
                    />
                    <Pagination
                        inactiveDotColor='gray'
                        dotColor={'orange'}
                        activeDotIndex={indexSelected}
                        dotsLength={images.length}
                        animatedDuration={150}
                        inactiveDotScale={1}
                    />
                </View>



                <View>
                    <TextPost title={'Bedroom 3 with bath area'} />
                    <ImagePost url={require('../Gallery/bath/1.jpeg')} />
                    <ImagePost url={require('../Gallery/bath/2.jpeg')} />
                    <ImagePost url={require('../Gallery/bath/3.jpeg')} />
                    <ImagePost url={require('../Gallery/bath/4.jpeg')} />
                    <ImagePost url={require('../Gallery/bath/5.jpeg')} />
                    <ImagePost url={require('../Gallery/bath/6.jpeg')} />
                </View>


                <View style={{marginBottom:30}}>
                    <TextPost title={'Living room & bar'} />
                    <ImagePost url={require('../Gallery/drink/1.jpeg')} />
                    <ImagePost url={require('../Gallery/drink/2.jpeg')} />
                    <ImagePost url={require('../Gallery/drink/3.jpeg')} />
                    <ImagePost url={require('../Gallery/drink/4.jpeg')} />
                    <ImagePost url={require('../Gallery/drink/5.jpeg')} />
                    <ImagePost url={require('../Gallery/drink/6.jpeg')} />

                </View>



            </View>
        </ScrollView>
    )
}

export default Gallery

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        borderRadius: 7,
        marginVertical: 20,
        height: 300,
        width: 400,
        justifyContent: 'center',
        alignItems: 'center', marginHorizontal: 6
    },
    text: {
        fontFamily: 'roboto-bold',
        fontSize: 40,
        color: 'white'
    },
    text1: {
        fontFamily: 'roboto-bold',
        fontSize: 35,
        color: '#6ec1e4',
        marginHorizontal: 10,
        marginTop: 30, marginBottom: 15
    }
})
