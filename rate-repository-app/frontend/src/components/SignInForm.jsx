import React from "react";
import FormikTextInput from "./FormikTextInput";
import { Pressable, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const SignInForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" pass placeholder="Password" />
      <Pressable testID="submit" onPress={onSubmit}>
        <Text bg="primary" style={theme.button} fontWeight={"bold"} color="white">Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;