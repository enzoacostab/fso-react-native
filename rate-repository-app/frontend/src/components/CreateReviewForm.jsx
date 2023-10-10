import React from "react";
import FormikTextInput from "./FormikTextInput";
import { Pressable, View } from "react-native";
import Text from "./Text";
import theme from "../theme";

const CreateReviewForm = ({onSubmit}) => {
  return (
    <View>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="name" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="review" multiline placeholder="Review" />
      <Pressable testID="submit" onPress={onSubmit}>
        <Text bg="primary" style={theme.button} fontWeight={"bold"} color="white">Create a review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReviewForm;