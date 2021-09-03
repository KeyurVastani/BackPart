import React, { useState } from 'react'
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native'
import axios from '../axios'
import TextBox from '../components/TextBox';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const SignInScreen = ({ navigation }) => {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [name, setname] = useState("")
  const [mobile, setmobile] = useState("")

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
      debugger
      console.log("errr-----------", err.response);
      alert(err?.response?.data?.error)
    });

  }
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        source={require('../images/casa-1.png')}
        style={{ height: 300 }}
      />
      <Text style={{ fontSize: 40, color: '#fbb034', fontFamily: 'roboto-Bold' }}>
        SignUp
      </Text>
      <View style={styles.footer}>
        <TextBox title={'name'} onChangeText={text => setname(text)} />
        <TextBox title={'email'} onChangeText={text => setemail(text)} />
        <TextBox title={'password'} onChangeText={text => setpassword(text)} />
        <TextBox
          title={'Mobile Number'}
          onChangeText={text => setmobile(text)}
        />

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
                navigation.navigate('SignInScreen')
              }}>

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
              onPress={() => submitData()}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#009387',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex: 3,
    marginTop: 10,
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
  thirdView: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    width: 220,
    justifyContent: 'space-between',
  },
  buttonText: {
    color: '#009387',
    fontSize: 20,
    alignSelf: 'center',
    fontFamily: 'roboto-Medium',
  },
});

export default SignInScreen;