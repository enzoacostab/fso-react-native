import React from "react";
import FormikTextInput from "./FormikTextInput";
import { Pressable, View, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  text:{
    margin: 10,
    borderRadius: 5,
    textAlign: "center",
    padding: 15,
    borderColor: theme.colors.textSecondary
  }
});

const SignInForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" pass placeholder="Password" />
      <Pressable onPress={onSubmit}>
        <Text bg="primary" style={styles.text} fontWeight={"bold"} color="white">Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;