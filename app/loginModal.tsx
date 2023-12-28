// LoginModal.tsx
import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Input, Spinner, Text, View } from 'tamagui';

import { LOGIN_USER } from '../Graphql/user.operations';
import { useLoginStore, useProductStore } from '../zustand/store';


const LoginForm = ({ onSubmit, isLoading }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = () => {
    const formData = { email, password };
    onSubmit(formData);
  };

  return (
    <>
      <View $sm={{ ...styles.container, backgroundColor: '$background' }}>
        <Image
          style={{
            margin: -50,
            overflow: 'hidden',
            resizeMode: 'cover',
            height: 250,
            width: 250,
            marginBottom: -40,
          }}
          source={require('../assets/adaptive-icon.png')}
        />
        <Text $sm={styles.title}>Login</Text>
        <Input
          autoCapitalize="none"
          $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
          placeholder="Email"
          placeholderTextColor="gray"
          value={email}
          keyboardType="email-address"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <Input
          autoCapitalize="none"
          $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
          placeholder="Password"
          secureTextEntry
          value={password}
          placeholderTextColor="gray"
          onChangeText={(text) => setPassword(text)}
        />
        {isLoading ? (
          <Button
            onPress={handleSubmit}
            fontSize={16}
            pressStyle={{ backgroundColor: 'gray' }}
            size="$4"
            color="white"
            disabled
            width="100%"
            backgroundColor="gray">
            <Spinner backgroundColor="gray" color="white" />
          </Button>
        ) : (
          <Button
            onPress={handleSubmit}
            width="100%"
            pressStyle={{ backgroundColor: '$green5Dark' }}
            size="$4"
            backgroundColor="$green8Dark">
            <Text fontSize={16} color="white" fontWeight="600">
              Login
            </Text>
          </Button>
        )}

        <Text
          $sm={styles.switchText}
          onPress={() => {
            router.push('/signupModal');
          }}>
          Don't have an account? Signup here.
        </Text>
      </View>
    </>
  );
};

// Main LoginModal component
export default function LoginModalScreen() {
  const router = useRouter();
  const { setUser } = useLoginStore();
  const { setProducts } = useProductStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loginUser, { loading: loginUserLoading, error: loginError }] = useMutation(LOGIN_USER);

  function validateEmail(email: any) {
    return email.includes('@' && '.') && email.length > 0;
  }
  const handleLoginSubmit = async (formData: any) => {
    try {
      setIsLoading(true);
      if (formData.email !== '' && formData.password !== '') {
        if (validateEmail(formData.email)) {
          const { data: loginUserData } = await loginUser({
            variables: { email: formData.email, password: formData.password },
          });
          const token = loginUserData.loginUser?.token;
          if (token) {
            await SecureStore.setItemAsync('token', token);
            await SecureStore.setItemAsync('email', formData.email.toString());
            await SecureStore.setItemAsync('password', formData.password.toString());
            // await SecureStore.setItemAsync('User', loginUserData.loginUser);
            // await SecureStore.setItemAsync('Products', loginUserData.loginUser.products);
            setUser(loginUserData.loginUser);
            console.log(loginUserData.loginUser.profileImageUrl)
            setProducts(loginUserData.loginUser.products);
            Toast.show({
              type: 'success',
              text1: 'Login Successful',
              text2: 'User logged in successfully !!!',
            });
          }
          router.push('/(tabs)/');
          setIsLoading(false);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Invalid Email',
            text2: 'The email you typed is Invalid please try again',
          });
          setIsLoading(false);
        }
      } else {
        Toast.show({
          type: 'error',
          text1: 'Empty input fields',
          text2: 'Please enter the details and try Logging in again!!!',
        });
        setIsLoading(false);
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: error.message.toString(),
      });
      console.log('Error while logging in', error);
      setIsLoading(false);
    }
  };
  return <LoginForm onSubmit={handleLoginSubmit} isLoading={isLoading} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    color: 'gray',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    width: '100%',
    borderRadius: 8,
  },
  switchText: {
    marginTop: 16,
    color: 'green',
    textDecorationLine: 'underline',
  },
});
