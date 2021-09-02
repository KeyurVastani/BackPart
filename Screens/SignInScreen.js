import React, { useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/action/loginAction'
import {Image} from 'react-native-animatable';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../components/TextBox';


const SignInScreen = ({ navigation }) => {
    const dispatch = useDispatch()
    const logindata = useSelector((state) => state.loginReducer)

    const [email, setemail] = useState("keyur@gmail.com")
    const [password, setpassword] = useState("kK123456@");


    useEffect(() => {
        console.log("logindata", logindata.user);
        debugger
        let msg = logindata.user.msg
        if (msg) {
            debugger
            
            Alert.alert("Success",logindata.user.msg)
            debugger
            navigation.navigate('HomeScreen');
        }

    }, [logindata.user]);

   

    const onSubmit = () => {
        debugger
        // alert(Object.keys(logindata))
        // alert(Object.keys(logindata.user))
        if (email.length === 0 || password.length === 0) {
            Alert.alert("Error", 'Please enter all fields');
        } else {
            dispatch(login(email, password))
        }
    }
    return (
        <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../images/casa-1.png')}
        style={{height: 300}}
      />

      <View style={styles.header}>
        <Text
          style={{fontSize: 40, color: '#fbb034', fontFamily: 'roboto-Bold'}}>
          {' '}
          Login{' '}
        </Text>
      </View>

      <View style={styles.footer}>
        <TextBox title={'Email'} onChangeText={text => setemail(text)} />
        <TextBox title={'Password'} onChangeText={text => setpassword(text)} isPassword />
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
              onPress={onSubmit}>
              <LinearGradient
                colors={['#ffdd00', '#fbb034']}
                style={styles.button}>
                <Text style={styles.buttonText}>{'Login'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('SignUpScreen')}>
              <LinearGradient
                colors={['#ffdd00', '#fbb034']}
                style={styles.button}>
                <Text style={styles.buttonText}>{'Register'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009387',
  },
  emailInput: {
    height: 40,
    fontSize: 18,
    width: 270,
    borderRadius: 20,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  passwordInput: {
    height: 40,
    fontSize: 18,
    width: 270,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 3,
    marginTop: 30,
    // alignItems: 'center',
  },

  button: {
    marginTop: 10,
    height: 50,
    width: 120,
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