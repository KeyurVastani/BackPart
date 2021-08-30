import React, { useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/action/loginAction'

const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const logindata = useSelector((state) => state.loginReducer)

    const [email, setemail] = useState("keyur@gmail.com")
    const [password, setpassword] = useState("kK1234567@");

    useEffect(() => {
        console.log("logindata", logindata);
    }, [logindata])

    const onSubmit = () => {
        debugger
        // alert(Object.keys(logindata))
        // alert(Object.keys(logindata.user))
        dispatch(login(email, password))     //1step
        debugger

        console.log("thsis --------", logindata)
        alert(logindata.user.msg)
    }
    return (


        <View style={styles.container} >

            <View style={styles.header}>
                <Text style={{ fontSize: 40 }}> Login Screen</Text>

            </View>

            <View style={styles.footer}>
                <Text style={{ fontSize: 20, marginLeft: -220 }}>Email</Text>
                <TextInput
                    style={styles.emailInput}
                    placeholder="email"
                    onChangeText={text => setemail(text)}
                    defaultValue={email}
                />

                <Text style={{ fontSize: 20, marginLeft: -180, marginTop: 20 }}>password</Text>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Password"
                    onChangeText={text => setpassword(text)}
                    defaultValue={password}
                />
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    < Button
                        style={styles.button}
                        title="Login"
                        color="red"
                        onPress={onSubmit}
                    />
                    < Button
                        style={styles.button}
                        title="SignUp"
                        color="red"
                        onPress={() => navigation.navigate('SignUpScreen')}
                    />
                </View>

            </View>
        </View>


    )
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009387'
    },
    emailInput: {
        height: 40,
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 1,
        width: 270,
    },
    passwordInput: {
        height: 40,
        fontSize: 30,
        borderColor: 'black',
        borderWidth: 1,
        width: 270,

    },
    header: {

        height: 70,
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center',

    },
    footer: {
        flex: 3,
        marginTop: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },

    button: {
        margin: 50,


    },
})


