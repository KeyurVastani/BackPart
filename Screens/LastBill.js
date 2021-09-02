import React from 'react'
import { View, Text, TextPropTypes, SafeAreaView,StyleSheet } from 'react-native'

const LastBill = (props) => {
    const date = props?.route?.params?.date

    console.log("prospsssss", props?.route?.params?.date)
    return (

        <View style={styles.container}>
            <Text>This is a text</Text>
        </View>
  
    )
}

export default LastBill

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#009387',
    },
})