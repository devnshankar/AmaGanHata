import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { TamaguiProvider, Theme } from 'tamagui';

import config from '../tamagui.config';

// APOLLO SERVER CONFIGURATION
const getToken = async () => {
  try {
    return await SecureStore.getItemAsync('token');
  } catch (err) {
    console.error('Error getting token from SecureStore:', err);
    return null;
  }
};

const httpLink = createHttpLink({
  uri: 'https://one-beagle-gradually.ngrok-free.app/graphql',
});

const authLink = setContext(async (_, { headers }) => {
  const token = await getToken();

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// DEFAULT ROOT CONFIGURATION BOILERPLATE
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorscheme: any = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
  const colorScheme: any = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <ApolloProvider client={client}>
      <TamaguiProvider config={config}>
        <ThemeProvider value={colorscheme}>
          <Theme name={colorScheme}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false, animation: 'none' }} />
              <Stack.Screen
                name="modal"
                options={{ presentation: 'modal', animation: 'slide_from_right' }}
              />
              <Stack.Screen
                name="loginModal"
                options={{ presentation: 'modal', animation: 'slide_from_bottom' }}
              />
            </Stack>
            <Toast />
          </Theme>
        </ThemeProvider>
      </TamaguiProvider>
    </ApolloProvider>
  );
}
