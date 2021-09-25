import React ,{useEffect}from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../helper/screenHelper'
import { useIsFocused } from '@react-navigation/core';
const CasaSunshineView = () => {


    // const isFocused = useIsFocused();



    // useEffect(async () => {
    //     if (isFocused) {
    //        await AsyncStorage.getItem('tokenvalue').then((res) => {
    //             if (res) {
    //                 console.log("res=======", res);
                

    //             }
    //         }).catch((err) => {
    //             console.log("err", err);
    //         })

    //     }
    // }, [isFocused])

    
    return (

        <ScrollView showsVerticalScrollIndicator={false} bounces='false' >
            <View style={styles.container}>
                <View style={styles.container1}>
                    <Image style={styles.image} source={require('../images/6.jpg')} />
                </View>
                <View style={styles.container2}>
                    <Text style={styles.mainText}> Casa Sunshine Villa </Text>
                    <Text style={[styles.subText, { marginTop: 20 }]}>

                        {'             '}  Casa Sunshine Villa design goes above and beyond to make these
                        holiday homes look as magnificent and impressive as possible. These
                        villas have also found a way to create an oasis of comfort and
                        respite – to convey its design into a feeling that translates into a
                        memorable and inspiring experience for every guest that leaves its
                        doors. From modern architectural gems, rustic interiors to stunning
                        outdoor ambiances, we highlighted unique and elegant design features
                        from villas in our collection that emphasize each of their distinct
                        personalities.{' '}
                    </Text>

                    <Text style={[styles.mainText, { marginTop: 20 }]}>
                        {' '}
                        An entrance to impress{' '}
                    </Text>
                    <Text style={[styles.subText, { marginTop: 20 }]}>
                        {'             '}
                        When it comes to grand entrances and establishing a strong first
                        impression, Casa Sunshine , one of the most beautiful villa in Goa,
                        tops it with elegance and sophistication. Leading to the staircase
                        is a stone pathway surrounded by a water feature that helps build
                        anticipation. Aside from the gorgeous view of the place, guests can
                        soak up the arresting view of the infinity pool below. Upon reaching
                        the top, guests are greeted by a wide and spacious open-plan living
                        and dining area. The villa also transcends its design by seamlessly
                        integrating its architecture into the calmness and Vintage
                        surrounding it.
                    </Text>
                    <Text style={[styles.mainText, { marginTop: 20 }]}>
                        {' '}
                        Next-level pool design.{ ' '}
                        <Text>Literally</Text> 
                   {' '}
                    </Text>
                    <Text style={[styles.subText, { marginTop: 20 }]}>
                        {'             '}
                        Among the many standout features of Casa Sunshine is its multi-level
                        infinity pool that cascades right through the middle of the villa
                        grounds. Aesthetically pleasing and impressively functional. The
                        unique design finds guests reconnecting with serenity and their
                        sense of escapism.
                    </Text>
                    <Text style={[styles.mainText, { marginTop: 20 }]}> Amenities </Text>
                    <Text style={[styles.subText, { marginTop: 20 }]}>
                            {' \u2B23  2 care takers available 24/7'}
                        </Text>
                        <Text style={styles.subText}>{' \u2B23  2 living rooms'}</Text>
                        <Text style={styles.subText}>
                            {' \u2B23  4 BHK with ensuite bathrooms'}
                        </Text>
                        <Text style={styles.subText}>{' \u2B23  Airport pickup'}</Text>
                        <Text style={styles.subText}>
                            {' \u2B23  Bed & bath linen & toiletries'}
                        </Text>
                        <Text style={styles.subText}>
                            {' \u2B23  Daily housekeeping services'}
                        </Text>
                        <Text style={styles.subText}>{' \u2B23  Ironing service'}</Text>
                        <Text style={styles.subText}>{' \u2B23  Parking for 2 cars'}</Text>
                        <Text style={styles.subText}>{' \u2B23  Swimming pool'}</Text>
                        <Text style={styles.subText}>
                            {' \u2B23  Televisions with DTH services'}
                        </Text>
                        <Text style={styles.subText}>{' \u2B23  Washing machine'}</Text>
                        <Text style={styles.subText}>{' \u2B23  Wifi available'}</Text>


                </View>
            </View>
        </ScrollView>

    );
};

export default CasaSunshineView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6F5F9'
        // alignItems: 'center',
        // justifyContent: 'center',
        // backgroundColor: 'green',
    },
    container2: {
        flex: 1,
        backgroundColor: '#E6F5F9',
        marginBottom:40
    },
    container1: {
        flex: 1,
    },
    mainText: {
        paddingTop: 30,
        flex: 1,
        fontSize: 35,
        color: '#514964',
        fontFamily: 'roboto-Bold',
        alignSelf: 'center',
    },
    subText: {
        fontSize: 20,
        color: '#7d8385',
        fontFamily: 'roboto-Medium',
        marginHorizontal: 30,
        marginTop: 8,
    },
    image: {
        height: hp(40),
        width: wp(100),
        resizeMode: 'cover'
    }
});
