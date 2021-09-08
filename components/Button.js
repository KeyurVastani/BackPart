import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


const Button = ({ onPress, title, style }) => {
    return (

        <TouchableOpacity
            onPress={onPress}
            style={[styles.bottomButton, style]}>
            <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>{title}</Text>
        </TouchableOpacity>


    )
}

export default Button


const styles = StyleSheet.create({
    bottomButton: {
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3172b',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 10
    }
})
