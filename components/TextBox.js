import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';

const TextBox = ({ onChangeText, title,children,sign,color, isPassword = false,textColor,inputTextColor,placeholderColor, value, returnType, ref1, ref2, keyPress ,design}) => {
  return (
    <View>
      <Text style={[styles.textStyle,textColor]}>{title}<Text style={{color:color}}>{sign}</Text></Text>
      <View style={[styles.containerStyle,design]}>
        <TextInput
          style={[styles.inputStyle,inputTextColor]}
          placeholder={title}
          value={value}
          placeholderTextColor={placeholderColor}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          autoCapitalize="none"
          returnKeyType={returnType}
          onSubmitEditing={ref1}
          ref={ref2}
          onKeyPress={keyPress}
        />
        <Text style={{left:20}}>{children}</Text>
      </View>
    </View>
  );
};

export default TextBox;

const styles = StyleSheet.create({
  inputStyle: {
    height: 50,
    fontSize: 20,
    width: 270,
    paddingHorizontal: 20,
    paddingVertical:10,
  
    
  },
  textStyle: {
    fontSize: 20,
    marginTop: 20,
    color: '#8e8e8e',
    fontFamily: 'roboto-bold',
    marginLeft: 20,
    left:20,
  },
  containerStyle: {
    flexDirection:'row',
    borderColor: '#fbb034',
    borderWidth: 0,
    backgroundColor: '#cccfd3',
    marginVertical: 10,
    marginHorizontal: 30,
    height:50,
    borderRadius: 30,
    alignItems:'center',
    justifyContent:'center',
    
  },
});
