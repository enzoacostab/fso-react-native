import { useMutation, useApolloClient } from "@apollo/client";
import { LOGIN } from "../graphql/queries";
import { CREATE_USER } from "../graphql/queries";
import { useContext } from "react";
import { context } from "../context/Context";

const useSignInUp = () => {
  const [mutateIn] = useMutation(LOGIN) ;
  const [mutateUp] = useMutation(CREATE_USER);
  const {authStorage} = useContext(context);
  const client = useApolloClient();

  const signIn = async (username, password) => {
    const {data} = await mutateIn({variables: {username, password}});
    await authStorage.setAccessToken(data.authorize.token);
    client.resetStore();
  };

  const signUp = async (username, password)=> {
    await mutateUp({variables: {username, password}});
    await signIn(username, password);
  };

  return {signIn, signUp};
};

export default useSignInUp;