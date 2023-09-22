import { useApolloClient, useMutation } from "@apollo/client";
import { LOGIN } from "../graphql/queries";
import { useContext } from "react";
import AuthStorageContext from "../context/AuthStorageContext";

const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);
    const authStorage = useContext(AuthStorageContext);
    const client = useApolloClient();
  
    const signIn = async ({ username, password }) => {
      const {data} = await mutate({variables: {username, password}});
      await authStorage.setAccessToken(data.authorize.token);
      client.resetStore();
    };
  
    return [signIn, result];
  };

export default useSignIn;