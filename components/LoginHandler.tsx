import { useMutation } from '@apollo/client';
import { LOGIN_USER } from 'Graphql/user.operations';
import * as SecureStore from 'expo-secure-store';
import Toast from 'react-native-toast-message';
import { useLoginStore, useProductStore } from 'zustand/store';

export const LoginHandler =async () => {
  const [loginUser, { loading: loginUserLoading, error: loginError }] = useMutation(LOGIN_USER);
  const email = await SecureStore.getItemAsync('email').catch((error) => {
    console.error('Error getting email from SecureStore:', error);
  });
  const password = await SecureStore.getItemAsync('password').catch((error) => {
    console.error('Error getting password from SecureStore:', error);
  });
  const { setUser } = useLoginStore();
  const { setProducts } = useProductStore();
  if (email && password) {
    try {
      const { data: loginUserData } = await loginUser({
        variables: { email, password },
      });
      const token = loginUserData.loginUser?.token;
      console.log(JSON.stringify(loginUserData.loginUser, null, 2));
      if (token) {
        await SecureStore.setItemAsync('token', token);
        setUser(loginUserData.loginUser);
        setProducts(loginUserData.loginUser.products);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'User logged in successfully !!!',
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message.toString(),
      });
      console.log('Error while logging in', error);
    }
  } else {
    Toast.show({
      type: 'info',
      text1: 'No User data please login',
      text2: 'Try to login again !!!',
    });
  }

  return null;
};
