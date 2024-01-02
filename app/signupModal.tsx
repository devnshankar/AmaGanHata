// LoginModal.tsx
import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { StyleSheet, ToastAndroid, Image } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, Input, Text, View, Spinner } from 'tamagui';

import { CREATE_USER, LOGIN_USER } from '../Graphql/user.operations';
import { useLoginStore, useOrderItemStore, useProductStore } from '../zustand/store';

// SignupForm component
const SignupForm = ({ onSubmit, isLoading }: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = () => {
    const formData = { firstName, lastName, email, password };
    console.log(JSON.stringify(formData));
    onSubmit(formData);
  };

  return (
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
      <Text $sm={styles.title}>Signup</Text>
      <Input
        autoCapitalize="words"
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
      />
      <Input
        autoCapitalize="words"
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Input
        autoCapitalize="none"
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        autoCapitalize="none"
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
        placeholder="Password"
        secureTextEntry
        value={password}
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
            Sign-up
          </Text>
        </Button>
      )}
      <Text
        $sm={styles.switchText}
        onPress={() => {
          router.back();
        }}>
        Already have an account? Login here.
      </Text>
    </View>
  );
};

// Main LoginModal component
export default function LoginModalScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useLoginStore();
  const { setProducts } = useProductStore();
  const { setOrderItems } = useOrderItemStore();

  const [loginUser, { loading: loginUserLoading, error: loginError }] = useMutation(LOGIN_USER);

  const [createUser, { loading: createUserLoading, error: createUserError }] =
    useMutation(CREATE_USER);

  function validateEmail(email: any) {
    return email.includes('@' && '.') && email.length > 0;
  }
  function validatePassword(password: any) {
    return password.length >= 8;
  }
  const handleLoginSubmit = async (formData: any) => {
    try {
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
          setProducts(loginUserData.loginUser.products);
          setOrderItems(loginUserData.loginUser.cart);
          Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'User logged in successfully !!!',
          });
        }
        router.push('/(tabs)/');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Invalid Email',
          text2: 'The email you typed is Invalid please try again',
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
  };
  const handleSignupSubmit = async (formData: any) => {
    try {
      if (
        formData.email !== '' &&
        formData.password !== '' &&
        formData.firstName !== '' &&
        formData.lastName !== ''
      ) {
        setIsLoading(true);
        if (validateEmail(formData.email)) {
          if (validatePassword(formData.password)) {
            const { data: createUserData } = await createUser({
              variables: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                password: formData.password,
              },
            });
            console.log('User created:', createUserData.createUser);
            ToastAndroid.show('User created Successfully !!!', ToastAndroid.BOTTOM);
            setIsLoading(false);
            await handleLoginSubmit(formData);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Insecure Password',
              text2: 'The password should be at least 8 characters long !!',
            });
            setIsLoading(false);
          }
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
          text2: 'Please fill up all inputs and try Logging in again!!!',
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error creating user:', error);
      setIsLoading(false);
    }
  };

  return <SignupForm onSubmit={handleSignupSubmit} isLoading={isLoading} />;
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
