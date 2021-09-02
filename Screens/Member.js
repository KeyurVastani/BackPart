import { NavigationContainer } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import { View, Text, Pressable, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'

import Color from '../assets/colors/color';
import RoundButton from '../components/RoundButton';

const Member = (props) => {
    console.log("props------------", props)
    console.log("Date------------", props.route.params.date)
    const [adults, setadults] = useState(0);
    const [children, setchildren] = useState(0);
    const [infants, setinfants] = useState(0);
    const [total, settotal] = useState(3)

    useEffect(() => {
        TotalMember = adults + children + infants
        settotal(TotalMember)
    }, [adults, children, infants])




    return (
        <SafeAreaView>
            <View style={{ justifyContent: 'space-between', height: "100%" }}>
                <View>
                    {/* row:1 adult */}
                    <View style={styles.row}>
                        {/* some text */}
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }} >Adults</Text>
                            <Text style={{ color: '#8d8d8d' }} >Ages 13 or above</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                            {/* button with value */}
                            <RoundButton sign={'-'}
                                onPress={() => { setadults(Math.max(0, adults - 1)) }} />
                            <Text style={{ marginHorizontal: 20, fontSize: 16 }}>{adults}</Text>
                            <RoundButton sign={'+'}
                                onPress={() => { setadults(adults + 1) }} />

                        </View>
                    </View>


                    {/* row:2 adult start */}
                    <View style={styles.row}>
                        {/* some text */}
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }} >Children</Text>
                            <Text style={{ color: '#8d8d8d' }} >Ages 2-12</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                            {/* button with value */}
                            <Pressable
                                style={styles.button}
                                onPress={() => { setchildren(Math.max(0, children - 1)) }}>
                                <Text style={{ fontSize: 20, color: '#474747' }}  > - </Text>
                            </Pressable>

                            <Text style={{ marginHorizontal: 20, fontSize: 16 }}>{children}</Text>

                            <Pressable
                                style={styles.button}
                                onPress={() => { setchildren(children + 1) }}>
                                <Text style={{ fontSize: 20, color: '#474747' }} > + </Text>
                            </Pressable>

                        </View>

                    </View>

                    {/* row:3 adult start */}
                    <View style={styles.row}>
                        {/* some text */}
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 17 }} >Infants</Text>
                            <Text style={{ color: '#8d8d8d' }} >Under 2</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                            {/* button with value */}
                            <Pressable
                                style={styles.button}
                                onPress={() => { setinfants(Math.max(0, infants - 1)) }}>
                                <Text style={{ fontSize: 20, color: '#474747' }}  > - </Text>
                            </Pressable>

                            <Text style={{ marginHorizontal: 20, fontSize: 16 }}>{infants}</Text>

                            <Pressable
                                style={styles.button}
                                onPress={() => { setinfants(infants + 1) }}>
                                <Text style={{ fontSize: 20, color: '#474747' }} > + </Text>
                            </Pressable>

                        </View>

                    </View>



                    {/* total person================================================ */}
                    <View style={[styles.row, styles.totaldesign]}>
                        {/* some text */}
                        <View>
                            <Text style={{ fontWeight: 'bold', fontSize: 25 }} >Total Member</Text>
                        </View>


                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>

                            <Text style={{ marginHorizontal: 20, fontSize: 25 }}>{total}</Text>
                        </View>

                    </View>
                </View>

                <TouchableOpacity
                    onPress={() => props.navigation.navigate("LastBill", {
                        date: props.route.params.date
                    })}
                    style={{
                        marginBottom: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#f15454',
                        height: 50,
                        marginHorizontal: 20,
                        borderRadius: 10
                    }}>
                    <Text style={{ fontSize: 20, color: 'white', fontWeight: 'bold' }}>Book The Villa</Text>
                </TouchableOpacity>

            </View>
        </SafeAreaView>



    )
}

export default Member;




const styles = StyleSheet.create({
    totaldesign: {
        marginTop: '93%',
        borderTopWidth: 1,
        borderColor: "black",
        borderBottomWidth: 1,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        paddingVertical: 20,
        marginHorizontal: 20,
        borderColor: 'lightgrey'
    },
    button: {
        borderWidth: 1,
        height: 30,
        width: 30,
        borderRadius: 15,
        borderColor: 'lightgrey',
        justifyContent: 'center',
        alignItems: 'center',
    }

})


