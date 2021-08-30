import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
// import { useSelector,useDispatch } from 'react-redux'
// import { login } from '../store/action/loginAction'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text>This is a home Screen</Text>
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },

})
