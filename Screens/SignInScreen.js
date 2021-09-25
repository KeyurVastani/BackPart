import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../store/action/loginAction';


import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../components/TextBox';
import Colors from '../assets/colors/color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import BlueButton from '../components/BlueButton';
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'


const SignInScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const logindata = useSelector(state => state.loginReducer);

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [isLoader, setLoader] = useState(false);
  const [ispassword, setispassword] = useState(true)
  const [checkEmail, setcheckEmail] = useState(true)
  const [checkPass, setcheckPass] = useState(true)

  useEffect(() => {
    if (email.length < 1) {
      setcheckEmail(false)
    }else{
      setcheckEmail(true)
    }
    if (password.length < 1) {
      setcheckPass(false)
    }
    else {
      setcheckPass(true)
    }

  }, [password, email])

  useEffect(() => {
    console.log('logindata', logindata);
    if (logindata.user?.error) {
      setLoader(false);
    } else {
      let msg = logindata?.user?.msg;
      if (msg) {
        setLoader(false);
        Alert.alert('Success', logindata.user.msg);
        // setemail('')
        // setpassword('')
        navigation.navigate('Drawers');

        // this is a asyncStorage
        AsyncStorage.setItem('tokenvalue', logindata.user.token);
      }
    }
  }, [logindata.user]);

  const onSubmit = () => {
    // alert(Object.keys(logindata))
    // alert(Object.keys(logindata.user))
    if (email.length < 1) {
      setcheckEmail(false)
    } else {
      setLoader(true);
      dispatch(login(email, password));

    }
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}

      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : null}>
      <ScrollView style={{ flex: 1, backgroundColor: 'black' }} bounces="false">
        <View style={styles.firstSec}>
          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => {
              navigation.navigate('Drawers');
            }}
          >
            <Text style={styles.skipText}>{'Skip'}</Text>
          </TouchableOpacity>
          <View style={styles.imageHeader}>
            <Image
              source={require('../images/casa-1.png')}
              style={styles.logo}
            />
          </View>
        </View>
        <View style={styles.secondSec}>
          <View style={{ width: "100%", justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <Image style={styles.image} source={require('../images/UserImage.png')} />
          </View>
          <TextBox
            title={'Email '}
            sign="*" color='black'
            onChangeText={text => setemail(text)}
            value={email}
            returnType={'next'}
            ref1={() => ref_input2.current.focus()}
            inputTextColor={{ paddingHorizontal: 20 }}
            design={{ paddingRight: 30 }}
          >
            <Fontisto
              name="email"
              size={30}
              color={Colors.gray} />
          </TextBox>
          {!checkEmail && <Text style={{ left: 35, color: '#800000' }}>please enter valid email</Text>}
          <TextBox
            title={'Password'}
            sign='*' color='black'
            onChangeText={text => setpassword(text)}
            isPassword
            value={password}
            returnType={'done'}
            ref1={() => onSubmit()}
            ref2={ref_input2}
            inputTextColor={{ paddingHorizontal: 20 }}
            isPassword={ispassword}
            design={{ paddingRight: 30 }}>
            <TouchableOpacity onPress={() => { setispassword(!ispassword) }}>
              <Ionicons
                name={!ispassword ? 'ios-eye-outline' : "eye-off-outline"}
                size={30}
                color={Colors.gray} />
            </TouchableOpacity>

          </TextBox>
          {!checkPass && <Text style={{ left: 35, color: '#800000' }}>please enter valid password</Text>}

          <View
            style={{
              marginTop: 20,
            }}>
            <View style={styles.btnCtn}>
              <BlueButton onPress={() => {
                (checkEmail==true,checkPass==true)?onSubmit():console.log("hello");;
              }}
                btnstyle={{ width: 300 }}>
                {isLoader ? (
                  <ActivityIndicator color={'red'} size={30} />
                ) : (
                  <Text style={styles.buttonText}>{'Sign In'}</Text>
                )}
              </BlueButton>
            </View>

            <View style={[styles.btnCtn, { marginTop: 0 }]}>
              <Text style={styles.RegText}>{"Don't Have an Account?"}</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('SignUpScreen')}>
                <Text
                  style={[
                    styles.RegText,
                    { fontSize: 20, fontFamily: 'roboto-bold' },
                  ]}>
                  {' '}
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignInScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.3;
const styles = StyleSheet.create({
  image: {
    height: 60,
    width: 60,
  },
  btnCtn: {
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    flexDirection: 'row',

  },
  RegText: {
    fontSize: 17,
    fontFamily: 'roboto-medium',
    color: Colors.signInBlue,
  },
  signIn: {
    top: 20,
    left: 25,
    fontSize: 40,
    color: Colors.signInBlue,
    fontFamily: 'roboto-Bold',
    marginBottom: 40,
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'roboto-bold',

  },
  button: {
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0,
    borderRadius: 30,
    height: 50,
    width: 300,
    backgroundColor: Colors.signInBlue,
  },
  skipText: {
    color: '#fff',
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'roboto-Medium',
  },
  imageHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  firstSec: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  secondSec: {
    flex: 1.3,
    backgroundColor: 'rgb(255,255,255)',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: 500,
    marginTop: 30,
    // overflow:'hidden'
  },
  skipBtn: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    top: 35,
    left: 140,
  },
});
