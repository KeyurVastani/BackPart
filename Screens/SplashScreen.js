import React, { useEffect } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    Dimensions,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    useEffect(() => {
        AsyncStorage.getItem('tokenvalue')
            .then(res => {
                if (res) {

                    navigation.navigate('Drawers');
                }
            })
            .catch(err => {
                console.log('err', err);
            });
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image

                    source={require('../images/casa-1.png')}
                    style={styles.logo}

                />
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={[styles.title, { fontWeight: '400' }]}>Welcome To</Text>
                <Text style={styles.title}>Casa Sunshine</Text>
                <Text style={styles.text}>A Piece of Heaven</Text>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('SignInScreen');
                        }}>
                        <View style={styles.SplashBtn}>
                            <Text style={styles.textSign}>Get Started</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    );
};

export default SplashScreen;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.3;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        top: 20
    },
    footer: {
        flex: 1.2,
        backgroundColor: 'rgb(255,255,255)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
        alignItems: 'center',


    },
    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: '#05375a',
        fontSize: 40,
        fontWeight: 'bold',
    },
    text: {
        color: 'black',

    },
    button: {
        alignItems: 'center',
        marginTop: 100,
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 8,
        elevation: 5

    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    SplashBtn: {
        backgroundColor: '#05375a',
        paddingVertical: 20,
        paddingHorizontal: 50,
        borderRadius: 50
    }
});
