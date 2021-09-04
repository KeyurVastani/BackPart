import React from 'react'
import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import Colors from '../assets/colors/color'
import { Image } from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import TextBox from '../components/TextBox';

const BookGuest = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.mainColor }}>

            <View style={styles.container}>
                <View style={styles.header}>
                    <Text
                        style={{ fontSize: 40, color: '#fbb034', fontFamily: 'roboto-Bold' }}>
                        {' '}
                        Book Villa As a Guest{' '}
                    </Text>
                </View>

                <View style={styles.footer}>
                    <TextBox title={'Name'} onChangeText={text => setemail(text)} />
                    <TextBox title={'Email'} onChangeText={text => setpassword(text)} isPassword />
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
                                    <Text style={styles.buttonText}>{'Book'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default BookGuest;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#009387',
    },


    header: {
        marginTop: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
    footer: {
        flex: 3,
        marginTop: 50,
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
        color: '#009387',
        fontSize: 20,
        alignSelf: 'center',
        fontFamily: 'roboto-Medium',
    },
});