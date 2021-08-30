import React, { useState } from 'react'
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import axios from '../axios'

const SignInScreen = ({ navigation }) => {

    const [email, setemail] = useState("keyur@gmail.com")
    const [password, setpassword] = useState("kK1234567@")
    const [name, setname] = useState("keyur")
    const [mobile, setmobile] = useState('858')

    const submitData = async () => {
      

        const registered = {
            email: email,
            password: password,
            name: name,
            phone: Number(mobile)
        }
        
        console.log("registered", registered)
        await axios.post('/register', registered).then((res) => {
          
            // console.log("Ressss-----", res)
            if (res.status === 201) {
                alert(res?.data?.msg)
                navigation.navigate("SignInScreen")

            }
        }).catch((err) => {
            // debugger
            // console.log("errr-----------", err.response);
            alert(err?.response?.data?.error)
        });

    }
    return (
        <View style={styles.container} >
            <View style={styles.header}>
                <Text style={{ fontSize: 40 }}> SignUp Screen</Text>

            </View>
            <View style={styles.footer}>
                <TextInput
                    style={styles.nameInput}
                    placeholder="name"
                    onChangeText={text => setname(text)}
                    defaultValue={name}
                />

                <TextInput
                    style={styles.emailInput}
                    placeholder="email"
                    onChangeText={text => setemail(text)}
                    defaultValue={email}

                />

                <TextInput
                    style={styles.passwordInput}
                    placeholder="password"
                    onChangeText={text => setpassword(text)}
                    defaultValue={password}

                />
                <TextInput
                    style={styles.mobileInput}
                    placeholder="Mobile Number"
                    onChangeText={text => setmobile(text)}
                    defaultValue={mobile}
                />
                <View style={styles.thirdView}>
                    < Button
                        style={styles.button}
                        title="Register"
                        color="red"
                        onPress={submitData}
                    />

                    < Button
                        style={styles.button}
                        title="SignIn"
                        color="red"
                        onPress={() => navigation.navigate('SignInScreen')}
                    />
                </View>

            </View>


        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009387'
    },
    nameInput: {
        height: 40,
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        margin: 10
    },
    emailInput: {
        height: 40,
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        margin: 10

    },
    passwordInput: {
        height: 40,
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        margin: 10
    },
    mobileInput: {
        height: 40,
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 1,
        width: 250,
        margin: 10

    },
    header: {

        height: 40,
        height: 60,
        marginTop: 130,
        alignItems: 'center',
        justifyContent: 'center',

    },
    footer: {

        alignItems: 'center',
        justifyContent: 'center'

    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 70,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    thirdView: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        width: 220,
        justifyContent: 'space-between'
    }
})


export default SignInScreen;



