import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is a home screen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009387'
    },

})
