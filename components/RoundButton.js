import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const RoundButton = (props) => {
    const { onPress, sign } = props;
    return (
        <Pressable
            style={styles.button}
            onPress={onPress}>
            <Text style={{ fontSize: 20, color: '#474747' }}  >{sign}</Text>
        </Pressable>
    )
}

export default RoundButton


const styles = StyleSheet.create({
    button: {
        borderWidth: 1,
        height: 30,
        width: 30,
        borderRadius: 15,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
    }

})