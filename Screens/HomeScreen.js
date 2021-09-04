
// import React from 'react'
// import { View, Text ,FlatList} from 'react-native'
// import FothoPost from '../components/FothoPost'
// import data from '../assets/fothoData'

// const HomeScreen = () => {
//     return (
//         <View>

//         <FlatList
//             data={data}

//             renderItem={({item})=><FothoPost  post={item}/>}
//         /> 
//     </View>
//     )
// }

// export default HomeScreen


























import React from 'react'
import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
// import { useSelector,useDispatch } from 'react-redux'
// import { login } from '../store/action/loginAction'


const ImagePost = ({ url }) => {
    return (
        <View>
            <Image style={styles.image} source={url} />
        </View>
    )
}


const HomeScreen = (props) => {




    return (
        <ScrollView>
            <View style={styles.container}>

                <ImagePost url={require('../images/6.jpg')} />

                <View style={{ padding: 25, marginTop: 30 }}>
                    <Text style={styles.text}>VILLA DESCRIPTION</Text>
                    <Text style={styles.normaltext}>Modern 2-storied villa with elegant interiors, features and amenities for modern living. This North Goa villa is a perfect choice for a large group looking for a private vacation.</Text>
                </View>

                <View style={[styles.image, { backgroundColor: '#156575', marginTop: 40 }]}>
                    <ImagePost url={require('../images/Goa_map-1.png')} />
                </View>

                <View style={{ padding: 25, marginTop: 30 }}>
                    <Text style={styles.text}>Vintage luxury</Text>
                    <Text style={styles.normaltext}>Casa Sunshine proves that with the right elements and presentation, Vintage design can be luxurious too. Each furniture piece and decor contributes to the overall style and aesthetic of the villa. Imagine setting foot to rooms inspired by palaces and French furnishings, while tracing the engraved patterns on each of its interior.</Text>
                </View>


                <ImagePost url={require('../images/9.png')} />



                <ImagePost url={require('../images/new-4-4.jpeg')} />


                <View style={{ padding: 25, marginTop: 30 }}>
                    <Text style={styles.text}>A blissful ensuite</Text>
                    <Text style={styles.normaltext}>Wonderful decisions were made at Casa Sunshine to produce a properly executed outdoor bath that lets you blissfully soak amidst nature. The villa’s master bedroom boasts an outdoor bathtub with a rainfall shower that sits as if floating in a pond – bold, indulgent, and utterly luxurious.</Text>
                    <Text style={[styles.normaltext, { marginTop: 15 }]}>This stunning home also features rooftop terraces, cozy hidden lounges, and 4 elegant bedrooms each with a picturesque view of the sea. Who wouldn’t want to wake up to the sound of the calming waves in the morning? Aside from the lush greenery all over the property, Swimming pool also enhance the tropical jungle vibe and aesthetic of the villa.</Text>
                </View>


                <ImagePost url={require('../images/13.png')} />


                <View style={{ padding: 25, marginTop: 30,marginBottom:20 }}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate("InquiryStack")}
                    style={styles.bottomButton}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Check Availabity</Text>
                </TouchableOpacity>
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
        borderRadius: 20,
        margin: 8,
        height: 400,
        width: 400
    },
    text: {
        fontSize: 35,
        fontFamily: 'roboto-Bold',
        color: '#684D73'
    },
    normaltext: {
        fontFamily: 'roboto-medium',
        fontSize: 20,
        marginTop: 10, color: '#555555'
    },
    bottomButton:{
        marginBottom: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e3172b',
        height: 50,
        marginHorizontal: 20,
        borderRadius: 10
    }


})
