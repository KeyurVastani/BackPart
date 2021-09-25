import React, { useState, useRef, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, SafeAreaView } from 'react-native'
import Colors from '../assets/colors/color'
import TextBox from '../components/TextBox';
import { useSelector } from 'react-redux';
import axios from '../axios'
import SquareButton from '../components/SquareButton';
import Fontisto from 'react-native-vector-icons/Fontisto'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'






const BookGuest = (props) => {
    const data = useSelector((state) => state.dateReducer)
    const [isLoader, setLoader] = useState(false)
    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [Number, setNumber] = useState('')
    const [isEmail, setisEmail] = useState(true)
    const [isName, setisName] = useState(true)
    const [isNumber, setisNumber] = useState(true)

    const totalmem = props?.route?.params?.member
    const day = props?.route?.params?.days;
    const ref_input1 = useRef();
    const ref_input2 = useRef();
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    useEffect(() => {
        if (!re.test(String(email).toLowerCase())) {
            setisEmail(false)
        } else {
            setisEmail(true)
        }
        if (name.length < 3) {
            setisName(false)
        }
        else {
            setisName(true)
        }
        if (Number.length < 10 || Number.length > 10) {
            setisNumber(false)
        }
        else {
            setisNumber(true)
        }

    }, [name, email, Number])





    const submitDate = async () => {
        setLoader(true)

        const BookData = {
            indate: data.indate,
            outdate: data.outdate,
            username: name,
            useremail: email,
            totalmember: totalmem,
            totaldays: day,
            number: Number,
            totalamount: day * 1000 * totalmem,
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



        <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
            Anima
            style={{ flex: 1 }}
            keyboardVerticalOffset={100}
            behavior={Platform.OS === 'ios' ? 'height' : null}>
            <ScrollView style={{ backgroundColor: Colors.lightblue }} >

                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 34, color: Colors.signInBlue, fontFamily: 'roboto-Bold' }}>Book Villa As</Text>
                        <Text style={{ fontSize: 39, color: Colors.signInBlue, fontFamily: 'roboto-Bold' }}>A Guest</Text>
                    </View>

                    <View style={styles.footer}>
                        <TextBox
                            textColor={{ color: Colors.bookBlack }}
                            title={'Name'}
                            sign='*' color='#000'
                            onChangeText={text => setname(text)}
                            value={name}
                            returnType={'next'}
                            ref1={() => ref_input1.current.focus()}
                            inputTextColor={{ paddingHorizontal: 10 }}
                            design={{ paddingRight: 30, backgroundColor: '#e5e5e5' }}

                        >
                            <EvilIcons
                                name="user"
                                size={35}
                                color='#4c4c4c' />
                        </TextBox>
                        {!isName && <Text style={{ left: 50, color: '#800000' }}>please enter atlist 3 character</Text>}

                        <TextBox
                            textColor={{ color: Colors.bookBlack }}
                            title={'Email'}
                            sign='*' color='#000'
                            onChangeText={text => setemail(text)}
                            value={email}
                            returnType={'next'}
                            ref1={() => ref_input2.current.focus()}
                            inputTextColor={{ paddingHorizontal: 10 }}
                            design={{ paddingRight: 30, backgroundColor: '#e5e5e5' }}
                            ref2={ref_input1}
                        >
                            <Fontisto
                                name="email"
                                size={30}
                                color='#4c4c4c' />
                        </TextBox>
                        {!isEmail && <Text style={{ left: 50, color: '#800000' }}>please enter valid email</Text>}

                        <TextBox
                            textColor={{ color: Colors.bookBlack }}
                            title={'Mobile'}
                            sign='*' color='#000'
                            onChangeText={text => setNumber(text)}
                            value={Number}
                            returnType={'done'}
                            ref1={() => { submitDate() }}
                            inputTextColor={{ paddingHorizontal: 10 }}
                            design={{ paddingRight: 30, backgroundColor: '#e5e5e5' }}
                            ref2={ref_input2}
                        >
                            <FontAwesome
                                name="phone"
                                size={30}
                                color='#4c4c4c' />
                        </TextBox>
                        {!isNumber && <Text style={{ left: 50, color: '#800000' }}>please enter 10 digit mobile number</Text>}




                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginTop: 50,
                            }}>
                            <View>

                                <SquareButton onPress={() => { submitDate() }} touchStyle={{ width: 300, backgroundColor: Colors.signInBlue }}>
                                    {
                                        isLoader ? <ActivityIndicator color={'red'} size={40} /> :

                                            <Text style={styles.buttonText}>{'Book'}</Text>

                                    }</SquareButton>


                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
};

export default BookGuest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.lightblue,
    },


    header: {
        flex: 1,
        marginTop: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 3,
        marginTop: 40,
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
        color: 'white',
        fontSize: 30,
        alignSelf: 'center',
        fontFamily: 'roboto-Medium',

    },
});