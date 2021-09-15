import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'


const windowHeight = Dimensions.get('window').height;

const ExtraScreen = () => {
    return (
        // <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.thirdCont}>
                    <Text style={styles.text}>Book Your Villa</Text>
                </View>

                <View style={styles.secondContainer}>

                </View>
            </View>
        // </SafeAreaView>
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
        marginTop:10,
        borderTopStartRadius:200,
        borderTopRightRadius:200

    }, thirdCont: {
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 40,
        
    }

})