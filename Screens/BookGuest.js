import React, { useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import Colors from '../assets/colors/color'
import { Image } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../components/TextBox';
import { useSelector } from 'react-redux';
import axios from '../axios'


const BookGuest = (props) => {
    const data = useSelector((state) => state.dateReducer)
    const [isLoader, setLoader] = useState(false)


    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [Number, setNumber] = useState('')
    const totalmem = props?.route?.params?.member

    const day = props?.route?.params?.days;



    const submitDate = async () => {
        setLoader(true)

      


        const BookData = {
            indate: data.indate,
            outdate: data.outdate,
            username: name,
            useremail: email,
            totalmember: totalmem,
            totaldays: day,
            number:Number,
            totalamount: day * 1000* totalmem,
            createdby: 'Guest'

        }


  
        await axios.post('/finalBooking', BookData).then((res) => {
      

            console.log("Ressss-----", res)
            if (res.status === 200) {

                Alert.alert("success", res?.data?.msg)
                setLoader(false)
                props.navigation.popToTop()
                

            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
            
            setLoader(false)

        });

    }
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.mainColor }}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text
                        style={{ fontSize: 40, color: '#fbb034', fontFamily: 'roboto-Bold' }}>
                        {' '}
                        Book Villa As a Guest{' '}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <TextBox title={'Name'} onChangeText={text => setname(text)} value={name} />
                    <TextBox title={'Email'} onChangeText={text => setemail(text)} value={email} />
                    <TextBox title={'Mobile'} onChangeText={text => setNumber(text)} value={Number} />

                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 20,
                        }}>
                        <View>

                            <TouchableOpacity
                                style={styles.button}
                                color="red"
                                onPress={() => {
                                    submitDate()
                                }}>
                                {
                                    isLoader ? <ActivityIndicator color={'red'} size={40} /> :
                                        <LinearGradient
                                            colors={['#ffdd00', '#fbb034']}
                                            style={styles.button}>
                                            <Text style={styles.buttonText}>{'Book'}</Text>
                                        </LinearGradient>
                                }

                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BookGuest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009387',
    },


    header: {
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 3,
        marginTop: 50,
    },

    button: {
        marginTop: 30,
        height: 50,
        width: 300,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundColor: 'white'
    },
    buttonText: {
        color: '#009387',
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'roboto-Medium',
    },
});