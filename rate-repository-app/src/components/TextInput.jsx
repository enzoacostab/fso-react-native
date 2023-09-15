/* eslint-disable no-unused-vars */
import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text:{
    borderStyle: "solid",
    borderWidth:1,
    margin: 10,
    borderRadius: 5,
    padding: 15,
    borderColor: theme.colors.textSecondary
  },
  err:{
    borderColor: theme.colors.err
  }
});

const TextInput = ({ style, error, pass, ...props }) => {
  const textInputStyle = [style, styles.text, error && styles.err];

  return <NativeTextInput placeholderTextColor={error ? theme.colors.err : "#A9A9A9"} secureTextEntry={pass} style={textInputStyle} {...props} />;
};

export default TextInput;