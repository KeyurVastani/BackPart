import React, { useEffect, useState } from 'react'
import { View, Text, Button, SafeAreaView, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../store/action/loginAction'
import { Image } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../components/TextBox';
import Colors from '../assets/colors/color'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch()
  const logindata = useSelector((state) => state.loginReducer)
  

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("");
  const [isLoader, setLoader] = useState(false)


  useEffect(() => {
    console.log("logindata", logindata);
    if (logindata.user?.error) {
      setLoader(false)
    } else {
      let msg = logindata.user.msg
      if (msg) {  
        setLoader(false)
        Alert.alert("Success", logindata.user.msg)
        navigation.navigate('Drawers')

        // this is a asyncStorage 
        AsyncStorage.setItem('tokenvalue', logindata.user.token)
      }
    }
  }, [logindata.user]);



  const onSubmit = () => {


    // alert(Object.keys(logindata))
    // alert(Object.keys(logindata.user))
    if (email.length === 0 || password.length === 0) {
      Alert.alert("Error", 'Please enter all fields');
    } else {
      setLoader(true)
      dispatch(login(email, password));

    }
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.mainColor }}>
      <View style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 15 }}>
        <TouchableOpacity
          style={{ justifyContent: 'flex-end' }}
          color="red"
          onPress={() => {
            navigation.navigate('Drawers')
          }}
        >
          <LinearGradient
            colors={['#ffdd00', '#fbb034']}
            style={styles.button}>
            <Text style={styles.buttonText}>{'Skip'}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>

        <Image
          resizeMode="contain"
          source={require('../images/casa-1.png')}
          style={{ height: 300 }}
        />

        <View style={styles.header}>
          <Text
            style={{ fontSize: 40, color: '#fbb034', fontFamily: 'roboto-Bold' }}>
            {' '}
            Login{' '}
          </Text>
        </View>

        <View style={styles.footer}>
          <TextBox title={'Email'} onChangeText={text => setemail(text)} value={email} />
          <TextBox title={'Password'} onChangeText={text => setpassword(text)} isPassword value={password}/>
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
                  onSubmit()
                }}>
                <LinearGradient
                  colors={['#ffdd00', '#fbb034']}
                  style={styles.button}>
                  {isLoader ?
                    <ActivityIndicator color={'red'} size={30} />
                    : <Text style={styles.buttonText}>{'Login'}</Text>
                  }

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
    </SafeAreaView>
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