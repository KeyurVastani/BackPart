import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'

const SquareButton = ({ children, touchStyle, textStyle, onPress }) => {
    return (


        <TouchableOpacity
            onPress={onPress}
            style={[styles.bottomButton, touchStyle]}>
            <Text style={[styles.text, textStyle]}>{children}</Text>
        </TouchableOpacity>

    )
}

export default SquareButton



const styles = StyleSheet.create({
    bottomButton: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        height: 50,
        minWidth: 150,
        marginHorizontal: 60,
        borderRadius: 10,
        borderWidth: 1,
    },
    text: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold'
    }


})
