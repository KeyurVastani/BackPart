import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions, Image } from 'react-native'
import ImageZoom from 'react-native-image-pan-zoom'
import Colors from '../assets/colors/color'

const windowHeight = Dimensions.get('window').height;

const ExtraScreen = (props) => {
    const url1 = props.route.params.url

    return (
        <View style={{ flex: 1, }}>
            <ImageZoom cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height * .9}
                imageWidth={400}
                imageHeight={400}
                style={{ backgroundColor: 'blue ' }}
            >

                <Image style={{ width: 390, height: 350 }}
                    source={url1} />
            </ImageZoom>
        </View>
    )
}

export default ExtraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(107,111,252,.8)",
    },
    secondContainer: {
        backgroundColor: 'white',
        height: windowHeight * .78,
        margin: 10,
        marginTop: 10,
        borderTopStartRadius: 200,
        borderTopRightRadius: 200

    }, thirdCont: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 40,

    }

})