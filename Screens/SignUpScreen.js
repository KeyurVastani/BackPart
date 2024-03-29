import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Alert,
} from 'react-native'
import axios from '../axios'
import TextBox from '../components/TextBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { ValidEmail, ValidPassword, ValidName, ValidNumber } from '../components/validations'





const SignInScreen = ({ navigation }) => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const [mobile, setmobile] = useState("")
  const [ispassword, setispassword] = useState(true)
  const [checkEmail, setcheckEmail] = useState(true)
  const [checkPass, setcheckPass] = useState(true)
  const [checkName, setcheckName] = useState(true)
  const [checkNumber, setcheckNumber] = useState(true)
  const ref_input1 = useRef();
  const ref_input2 = useRef();
  const ref_input3 = useRef();







  const submitData = async () => {
    if (ValidName(name)) {
      setcheckName(false)
    }
    else if (ValidEmail(email)) {
      setcheckName(true)
      setcheckEmail(false)
    }
    else if (ValidPassword(password)) {
      setcheckName(true)
      setcheckEmail(true)
      setcheckPass(false)
    }
    else if (ValidNumber(mobile)) {
      setcheckName(true)
      setcheckEmail(true)
      setcheckPass(true)
      setcheckNumber(false)
    }
    else {
      setcheckName(true)
      setcheckEmail(true)
      setcheckPass(true)
      setcheckNumber(true)

      const registered = {
        email: email,
        password: password,
        name: name,
        phone: mobile
      }

      console.log("registered", registered)
      await axios.post('/register', registered).then((res) => {

        // console.log("Ressss-----", res)
        if (res.status === 201) {
          alert(res?.data?.msg)
          navigation.navigate("SignInScreen")

        }
      }).catch((err) => {

        console.log("errr-----------", err.response);
        alert(err?.response?.data?.error)
      });

    }
  }
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : null}
    >
      <ScrollView style={{ flex: 1, backgroundColor: '#0a090b' }} bounces='false' showsVerticalScrollIndicator={false}  >
        <View style={styles.secondContainer}>

          <View style={styles.signupCtn}>
            <TouchableOpacity onPress={() => {
              navigation.navigate('SignInScreen')
            }}>
              <View style={styles.arrowCtn}>
                <View>
                  <Ionicons
                    name="chevron-back"
                    size={40}
                    color='white' />
                </View>
              </View>
            </TouchableOpacity>


            <View style={styles.textCtn}>
              <Text style={{ fontSize: 40, color: 'white', fontFamily: 'roboto-Bold' }}>
                SignUp
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TextBox title={'Name'} sign=' *' color='#fff' onChangeText={text => setname(text)} value={name} returnType={"next"} ref1={() => ref_input1.current.focus()} design={styles.textcomDesign}
              textColor={{ color: '#eaeaeb' }} inputTextColor={{ color: '#adacaf' }}
              placeholderColor={'gray'}>
              <EvilIcons
                name="user"
                size={35}
                color='white' />
            </TextBox>
            {!checkName && <Text style={{ left: 35, color: 'red' ,fontSize:16}}>Only characters A-Z, a-z and '-' are  acceptable.</Text>}

            <TextBox title={'Email'} sign=' *' color='#fff' onChangeText={text => setemail(text.toLowerCase())} value={email} returnType={"next"} ref1={() => ref_input2.current.focus()} ref2={ref_input1} design={styles.textcomDesign}
              textColor={{ color: '#eaeaeb' }} placeholderColor={'gray'}
              inputTextColor={{ color: '#adacaf' }} >
              <Fontisto
                name="email"
                size={30}
                color='white' />
            </TextBox>
            {!checkEmail && <Text style={{ left: 40, color: 'red' ,fontSize:16}}>please enter valid email</Text>}

            <TextBox title={'Password'} sign=' *' color='#fff' onChangeText={text => setpassword(text)} value={password} returnType={"next"} ref1={() => ref_input3.current.focus()} ref2={ref_input2}
              design={styles.textcomDesign} placeholderColor={'gray'}
              textColor={{ color: '#eaeaeb' }}
              inputTextColor={{ color: '#adacaf' }} isPassword={ispassword} >
              <TouchableOpacity onPress={() => { setispassword(!ispassword) }}>
                <Ionicons
                  name={!ispassword ? 'ios-eye-outline' : "eye-off-outline"}
                  size={30}
                  color='white' />
              </TouchableOpacity>
            </TextBox>
            {!checkPass && <Text style={{ left: 35, color: 'red',fontSize:16 }}>minimum 8 characters, combination of uppercase and lowercase letter and number </Text>}

            <TextBox
              title={'Mobile Number'} sign=' *' color='#fff' placeholderColor={'gray'}
              onChangeText={text => setmobile(text)}
              returnType={"done"}
              ref2={ref_input3}
              ref1={() => submitData()}
              design={styles.textcomDesign}
              textColor={{ color: '#eaeaeb' }}
              inputTextColor={{ color: '#adacaf' }}>
              <FontAwesome
                name="phone"
                size={30}
                color='white' />
            </TextBox>
            {!checkNumber && <Text style={{ left: 45, color: 'red',fontSize:16 }}>please enter valid 10 digit Number</Text>}

            <View style={[styles.btnDsign]}>
              <TouchableOpacity
                onPress={() =>submitData()}>
                <View
                  style={styles.button}>
                  <Text style={styles.buttonText}>{'Create Account'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={[styles.btnDsign, { flexDirection: 'row', top: 40 }]}>
            <Text style={{ color: '#fff', fontSize: 17 }}>Already have a Account? </Text>
            <TouchableOpacity onPress={() => {
              navigation.navigate('SignInScreen')
            }} >
              <Text style={{ color: '#fff', fontSize: 20, fontFamily: 'roboto-bold' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a090b',
  },
  signupCtn: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  arrowCtn: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 12,
    marginRight: 40,

  },
  textCtn: {
    marginRight: 130,
  },

  secondContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a090b',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex: 3,
    marginTop: 50,
    // alignItems: 'center',
  },

  button: {
    marginTop: 10,
    height: 55,
    width: 300,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  thirdView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 220,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#000',
    fontSize: 25,
    alignSelf: 'center',
    fontFamily: 'roboto-Medium',
  },
  textcomDesign: {
    borderRadius: 10,
    backgroundColor: '#0a090b',
    borderColor: '#fff',
    borderWidth: 1,
    width: 330,
    paddingRight: 30
  },
  btnDsign: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 30,
  }
});

export default SignInScreen;