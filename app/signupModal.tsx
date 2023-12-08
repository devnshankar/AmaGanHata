// LoginModal.tsx
import { useMutation } from '@apollo/client';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Modal, StyleSheet } from 'react-native';
import { Button, Input, Text, View } from 'tamagui';

import { CREATE_USER, LOGIN_USER } from '../Graphql/user.operations';
import { useLoginStore } from '../zustand/store';

// SignupForm component
const SignupForm = ({ onSubmit }: any) => {
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
      <Text $sm={styles.title}>Signup</Text>
      <Input
        placeholder="First Name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
      />
      <Input
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
        placeholder="Last Name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <Input
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <Input
        $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
        placeholderTextColor="gray"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <Button backgroundColor="gray" onPress={handleSubmit}>
        Signup
      </Button>
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
  const router = useRouter();
  const { showLogin, setShowLogin, setUser } = useLoginStore();

  const [loginUser, { loading: loginUserLoading, error: loginError }] = useMutation(LOGIN_USER);

  const [createUser, { loading: createUserLoading, error: createUserError }] =
    useMutation(CREATE_USER);

  const handleLoginSubmit = async (formData: any) => {
    try {
      const { data: loginUserData } = await loginUser({
        variables: { email: formData.email, password: formData.password },
      });

      console.log('User logged in:', loginUserData.loginUser);

      const token = loginUserData.loginUser?.token;
      if (token) {
        await SecureStore.setItemAsync('token', token);
        await setUser(loginUserData.loginUser);
      }
      router.push('/(tabs)/');
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignupSubmit = async (formData: any) => {
    try {
      const { data: createUserData } = await createUser({
        variables: {
          firstName: formData.firstName,
          email: formData.email,
          password: formData.password,
        },
      });

      console.log('User created:', createUserData.createUser);

      await handleLoginSubmit(formData);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return <SignupForm onSubmit={handleSignupSubmit} />;
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
