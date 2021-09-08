import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

const LongRouButton = ({ onPress, title, style }) => {
    return (
        <View style={styles.button} >
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                    colors={['#ffdd00', '#fbb034']}
                    style={styles.button1}>
                    <Text style={styles.textbutton}>{title}</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    )
}

export default LongRouButton;


const styles = StyleSheet.create({
    textbutton: {
        fontSize: 20
    },

    button1: {

        height: 50,
        width: 300,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        marginHorizontal: 50,
    }
})
