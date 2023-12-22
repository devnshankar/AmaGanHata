import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { View, Text } from 'tamagui';
import { useLoginStore } from 'zustand/store';

const LogoutAlertModalScreen = () => {
  const { showLogin, setShowLogin, setUser } = useLoginStore();
  const colorScheme = useColorScheme();
  const router = useRouter();
  const handleLogoutPress = async () => {
    // Remove the token from SecureStore on logout
    await SecureStore.deleteItemAsync('token');
    console.log('User logged out');
    console.log(SecureStore.getItemAsync('token'));
    await setUser(null);
    Toast.show({
      type: 'success',
      text1: 'LogOut Successful',
      text2: 'User logged out successfully !!!',
    });
    //! setShowLogin(false);
    router.push('/loginModal');
  };
  return (

      <View>
        <Text color="$color">logoutAlertModalScreen</Text>
      </View>

  );
};

export default LogoutAlertModalScreen;
