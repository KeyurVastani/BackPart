import React, { useState,useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity ,Alert} from 'react-native'
import TextBox from '../components/TextBox'
import axios from '../axios'
import { useSelector } from 'react-redux'
import Header from '../components/Header'


const GuestDetail = (props) => {

    const [email, setemail] = useState("")
    const [userdata, setuserdata] = useState({})
    const [LoginuserEmail, setLoginuserEmail] = useState('')
    const loginUser = useSelector(state => state.loginReducer)
   
 
    useEffect(() => {
      setLoginuserEmail(loginUser.user.data.email)
    }, [loginUser])

    const submitEmail = async () => {
        const dateReg = {
            "useremail":email
        }
       
        console.log("registered", dateReg)
        await axios.post('/BookingFatch', dateReg).then((res) => {
            console.log("Ressss-----", res)
            if (res.status === 200) {
                Alert.alert("Success", res?.data?.msg)
                  setuserdata(res?.data?.bookdata)
            }
        }).catch((err) => {
            console.log("errr-----------", err.response);
            Alert.alert("Error", err?.response?.data?.error)
        });

    }
    return (
   
            <View>
                 <Header navigation={props.navigation} title="Guest Booking Detail" />
                <View style={styles.container}>
                    <TextBox title={'Email'} onChangeText={text => setemail(text)} />

                    <View>
                        <TouchableOpacity onPress={() => submitEmail()}>
                            <Text>Search my data</Text>
                        </TouchableOpacity>
                    </View>
                </View>


                <View>
                    <Text style={styles.text}> Your Booking Datail</Text>
                </View>
                <View>
                    <Text style={styles.text}>indate:{userdata.indate}</Text>
                    <Text style={styles.text}>outdate:{userdata.outdate}</Text>
                    <Text style={styles.text}>name:{userdata.username}</Text>
                    <Text style={styles.text}>email:{userdata.useremail}</Text>
                    <Text style={styles.text}>member:{userdata.totalmember}</Text>

                </View>
                <View style={{ margin: 30 }}>
                <Text style={styles.text}> cancle booking</Text>
                </View>

            </View>
       
    )
}

export default GuestDetail


const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20
    },
    text: {
        fontFamily: 'roboto-bold',
        fontSize: 30,
        color: "#fbb034",
        justifyContent: 'center', margin: 10
    }
})