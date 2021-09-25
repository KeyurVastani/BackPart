import React from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'

const BlueButton = ({ btnstyle, textstyle, onPress, children }) => {
    return (
        <>
            <TouchableOpacity onPress={onPress} >

                <View style={[styles.container, btnstyle]}>

                    <Text style={[styles.text, textstyle]}>{children}</Text>

                </View>
            </TouchableOpacity>
        </>

    )
}

export default BlueButton


const styles = StyleSheet.create({
    container: {

        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 8,
        elevation: 5,
        backgroundColor: '#05375a',
        minWidth: 150,
        width: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 35
    },
    text: {
        fontSize: 25,
        color: '#fff'
    },

})