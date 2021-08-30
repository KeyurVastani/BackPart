import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { View } from 'react-native-animatable';
import OutlineInput from 'react-native-outline-input';

const Form = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <SafeAreaView>
            <OutlineInput
                value={email}
                onChangeText={(e) => setEmail(e)}
                label="First Name"
                activeValueColor="#6c63fe"
                activeBorderColor="#6c63fe"
                activeLabelColor="#6c63fe"
                passiveBorderColor="Black"
                passiveLabelColor="#bbb7ff"
                passiveValueColor="#bbb7ff"
            />


            <View style={styles.container}>
                <OutlineInput
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    label="Email"
                    activeValueColor="black"
                    activeBorderColor="green"
                    activeLabelColor="green"
                    passiveBorderColor="#bbb7ff"
                    passiveLabelColor="#bbb7ff"
                    passiveValueColor="#bbb7ff"
                />
            </View>

            <View style={styles.container}>
                <OutlineInput
                    value={password}
                    onChangeText={(e) => setPassword(e)}
                    label="Write Your Content"
                    activeValueColor="black"
                    activeBorderColor="green"
                    activeLabelColor="green"
                    passiveBorderColor="#bbb7ff"
                    passiveLabelColor="#bbb7ff"
                    passiveValueColor="#bbb7ff"
                />
            </View>
        </SafeAreaView>
    );
};


export default Form

const styles = StyleSheet.create({
    container: {
        marginTop: 40
    }
})