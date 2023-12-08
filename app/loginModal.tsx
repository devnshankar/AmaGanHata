// LoginModal.tsx
import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Button, Input, Text, View } from 'tamagui';

import { LOGIN_USER } from '../Graphql/user.operations';
import { useLoginStore } from '../zustand/store';
import Toast from 'react-native-toast-message';

// LoginForm component
const LoginForm = ({ onSubmit }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const handleSubmit = () => {
    const formData = { email, password };
    onSubmit(formData);
  };

  return (
    <View $sm={{ ...styles.container, backgroundColor: '$background' }}>
      <Text $sm={styles.title}>Login</Text>
      <Input
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholder="Email"
        placeholderTextColor="gray"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholder="Password"
        secureTextEntry
        value={password}
        placeholderTextColor="gray"
        onChangeText={(text) => setPassword(text)}
      />
      <Button size={'$4'} $sm={{ width: '' }} backgroundColor="gray" onPress={handleSubmit}>
        Login
      </Button>
      <Text
        $sm={styles.switchText}
        onPress={() => {
          router.push('/signupModal');
        }}>
        Don't have an account? Signup here.
      </Text>
    </View>
  );
};

// Main LoginModal component
export default function LoginModalScreen() {
  const router = useRouter();
  const { showLogin, setShowLogin, setUser } = useLoginStore();

  const [loginUser, { loading: loginUserLoading, error: loginError }] = useMutation(LOGIN_USER);

  const handleLoginSubmit = async (formData: any) => {
    try {
      const { data: loginUserData } = await loginUser({
        variables: { email: formData.email, password: formData.password },
      });
      const token = loginUserData.loginUser?.token;
      if (token) {
        await SecureStore.setItemAsync('token', token);
        await setUser(loginUserData.loginUser);
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: 'User successfully logged in',
        });
      }
      
      router.push('/(tabs)/');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: 'There was a problem logging in',
      });
    }
  };
  return <LoginForm onSubmit={handleLoginSubmit} />;
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
    color: '#333',
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
    color: 'blue',
  },
});
