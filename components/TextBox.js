import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

const TextBox = ({ onChangeText, title, isPassword = false, value }) => {
  return (
    <View>
      <Text style={styles.textStyle}>{title}</Text>
      <View style={styles.containerStyle}>
        <TextInput
          style={styles.inputStyle}
          placeholder={title}
          value={value}
          onChangeText={onChangeText}
          // secureTextEntry={isPassword}
          autoCapitalize="none"
        />
      </View>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  inputStyle: {
    height: 40,
    fontSize: 18,
    width: 270,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginTop: 5,
  },
  textStyle: {
    fontSize: 20,
    marginTop: 20,
    color: '#fbb034',
    fontFamily: 'roboto-Medium',
  },
  containerStyle: {
    borderColor: '#fbb034',
    borderBottomWidth: 1,
    borderWidth: 0,
  },
});
