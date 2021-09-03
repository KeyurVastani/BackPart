import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
// import { useSelector,useDispatch } from 'react-redux'
// import { login } from '../store/action/loginAction'

const HomeScreen = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Image style={styles.image} source={require('../images/5.jpg')} />
                </View>
                <View style={{padding:25,marginTop:30}}>
                    <Text style={styles.text}>VILLA DESCRIPTION</Text>
                    <Text style={styles.normaltext}>Modern 2-storied villa with elegant interiors, features and amenities for modern living. This North Goa villa is a perfect choice for a large group looking for a private vacation.</Text>
                </View>
                <View style={{backgroundColor:'#156575'}}>
                <Image style={styles.image} source={require('../images/Goa_map-1.png')} />
                </View>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
   
        height: 500,
        width: 400
    },
    text:{
        fontSize:35,
        fontFamily:'roboto-Italic',
        color:'#684D73'
    },
    normaltext:{
        fontFamily:'roboto-medium',
        fontSize:20,
        marginTop:10,color:'#555555'
    }

})
