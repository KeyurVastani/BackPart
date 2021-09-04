import React from 'react'
import { View, Text, ImageBackground,Image, TouchableOpacity } from 'react-native'

import { Dimensions, StyleSheet } from "react-native";

const FothoPost = (props) => {
    const post = props.post
    return (
        
        <View style={styles.container}>
            {/* Image */}
            <TouchableOpacity>
            <Image 
            style={styles.image}
            source={post.image}/>
            </TouchableOpacity>


            {/* bad and badroom */}
            <Text style={styles.badrooms}>{post.bed} Bad, {post.bedroom} BadRoom</Text>
            

            {/* type and discription */}
            <Text style={styles.discription} numberOfLines={2}>
               {post.type}  {post.title}
            </Text>


            {/* old price and new price */}
            <Text style={styles.prices}>
                <Text style={styles.oldPrice}>${post.oldPrice}</Text>
                <Text style={styles.price}> ${post.newPrice} </Text>
                 / night
            </Text>


            {/* total price */}
            <Text style={styles.totalPrice}>{post.totalPrice} Total Price</Text>


        </View>
       


    )
}

export default FothoPost;




const styles=StyleSheet.create({
    container:{
        margin:20,
    },
    image:{
        width:Dimensions.get("screen").width-40,
        height:Dimensions.get("screen").height/4,
        borderRadius:15
    },badrooms:{
        marginVertical:10,
        color:'#5b5b5b'
    },
    discription:{
        fontSize:18,
        lineHeight:26
    },
    prices:{
        fontSize:18,
        marginVertical:10
       
    },
    oldPrice:{ 
        color:'#5b5b5b',
        textDecorationLine:'line-through'
    },
    price:{
        fontWeight:'bold'
    },
    totalPrice:{
        color:'#5b5b5b',
        fontSize:16,
        textDecorationLine:'underline',
    }
})
