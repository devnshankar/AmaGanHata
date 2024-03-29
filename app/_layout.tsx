import { createHttpLink, ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { setContext } from '@apollo/client/link/context';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import Toast from 'react-native-toast-message';
import { TamaguiProvider, Theme } from 'tamagui';
import { useLoginStore } from 'zustand/store';
import config from '../tamagui.config';

if (__DEV__) {
  // Adds messages only in a dev environment
  loadDevMessages();
  loadErrorMessages();
}

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
  uri: process.env.EXPO_PUBLIC_SERVER_URI,
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

// typePolicies: {
//   Querry: {
//     fields: {
//       getAllProducts: {
//         merge(_, incoming, { cache }) {
//           cache.modify({
//             fields: {
//               getAllProducts(existing = []) {
//                 return [...existing, incoming];
//               },
//             },
//           });
//         },
//       },
//     },
//   },
//   Mutation: {
//     fields: {
//       getAllProducts: {
//         merge(_, incoming, { cache }) {
//           cache.modify({
//             fields: {
//               getAllProducts(existing = []) {
//                 return [...existing, incoming];
//               },
//             },
//           });
//         },
//       },
//     },
//   },
// },

// DEFAULT ROOT CONFIGURATION BOILERPLATE
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

export default function RootLayout() {
  const colorscheme: any = useColorScheme() === 'dark' ? DarkTheme : DefaultTheme;
  const colorScheme: any = useColorScheme();
  const { showLogin } = useLoginStore();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });
  console.log(showLogin);
  useEffect(() => {
    if (loaded && showLogin) {
      SplashScreen.hideAsync();
    }
  }, [loaded, showLogin]);

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
                options={{
                  headerShown: false,
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="signupModal"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                  animation: 'slide_from_left',
                }}
              />
              <Stack.Screen
                name="editProfileModal"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="logoutAlertModal"
                options={{ headerShown: false, presentation: 'modal', animation: 'fade' }}
              />
              <Stack.Screen
                name="createProductModal"
                options={{
                  headerShown: false,
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
              />
              <Stack.Screen
                name="notificationModal"
                options={{
                  headerTitle: 'Notifications',
                  presentation: 'modal',
                  animation: 'slide_from_bottom',
                }}
              />
            </Stack>
            <Toast />
          </Theme>
        </ThemeProvider>
      </TamaguiProvider>
    </ApolloProvider>
  );
}
