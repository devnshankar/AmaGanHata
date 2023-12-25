import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import React from 'react';
import { useColorScheme, StyleSheet, ActivityIndicator } from 'react-native';
import Toast from 'react-native-toast-message';
import { ListItem, Separator, XStack, YGroup, Text, View } from 'tamagui';

// import Colors from '../../../constants/Colors';
import { useLoginStore, useProductStore } from 'zustand/store';

const OptionsTabScreen = () => {
  const { showLogin, setShowLogin, setUser } = useLoginStore();
  const { setProducts } = useProductStore();
  const colorScheme = useColorScheme();
  const router = useRouter();

  const handleMyOrdersPress = () => {
    // Implement logic for My Orders
    // router.push('/(tabs)/options/previousorder');
    console.log('My Orders Pressed');
    // router.push('/(tabs)/optionstabscreen/previousorder/');
  };

  const handleProfileSettingsPress = () => {
    // Implement logic for Profile Settings
    console.log('Profile Settings Pressed');
  };

  const handleNotificationSettingsPress = () => {
    // Implement logic for Notification Settings
    console.log('Notification Settings Pressed');
  };

  const handlePrivacySettingsPress = () => {
    // Implement logic for Privacy Settings
    console.log('Privacy Settings Pressed');
  };

  const handleHelpSupportPress = () => {
    // Implement logic for Help & Support
    console.log('Help & Support Pressed');
  };
  const handleLogoutPress = async () => {
    // Remove the token from SecureStore on logout
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('email');
    await SecureStore.deleteItemAsync('password');
    setUser(null);
    setProducts(null);
    console.log('User logged out');
    Toast.show({
      type: 'success',
      text1: 'LogOut Successful',
      text2: 'User logged out successfully !!!',
    });
    //! setShowLogin(false);
    router.push('/loginModal');
  };
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // Set loading to true when starting to fetch data
    setLoading(true);

    // Your data fetching logic goes here

    // Set loading to false when data fetching is complete
    setLoading(false);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <>
      {loading ? (
        <View style={{ ...styles.loadingContainer }}>
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: '50%' }}
            size="large"
            color="green"
          />
        </View>
      ) : (
        <>
          <XStack $sm={styles.container}>
            <View $sm={{ flex: 1, flexDirection: 'column' }}>
              <View $sm={{ marginBottom: 15 }}>
                <Text
                  $sm={{ padding: 3, paddingTop: 0, fontSize: 16, fontWeight: 'bold' }}
                  color="$color">
                  My Stuff
                </Text>
                <YGroup
                  alignSelf="center"
                  bordered
                  width="100%"
                  size="$5"
                  elevation={10}
                  borderColor={colorScheme === 'dark' ? '$green7Dark' : 'white'}
                  separator={
                    <Separator
                      borderColor={colorScheme === 'dark' ? '$green7Dark' : '$gray5Light'}
                    />
                  }>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      onPress={() => {
                        router.push('/(tabs)/optionstab/myorders/');
                      }}
                      backgroundColor={'$listItemBackgroundColor'}
                      pressStyle={{ backgroundColor: '$listItemPressColor' }}
                      title="My Orders"
                      icon={<FontAwesome5 solid size={22} name="shopping-basket" />}
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                    />
                  </YGroup.Item>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      pressStyle={{ backgroundColor: '$listItemPressColor' }}
                      backgroundColor={'$listItemBackgroundColor'}
                      title="My Products"
                      icon={<FontAwesome5 size={22} name="dice-d6" />}
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                    />
                  </YGroup.Item>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      pressStyle={{ backgroundColor: '$listItemPressColor' }}
                      backgroundColor={'$listItemBackgroundColor'}
                      title="My Sales"
                      icon={<FontAwesome5 size={22} name="chart-line" />}
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                    />
                  </YGroup.Item>
                </YGroup>
              </View>
              <View $sm={{ marginBottom: 15 }}>
                <Text
                  $sm={{ padding: 3, paddingTop: 0, fontSize: 16, fontWeight: 'bold' }}
                  color="$color">
                  Utilities
                </Text>
                <YGroup
                  alignSelf="center"
                  bordered
                  width="100%"
                  size="$5"
                  elevation={8}
                  borderColor={colorScheme === 'dark' ? '$green7Dark' : 'white'}
                  separator={
                    <Separator
                      borderColor={colorScheme === 'dark' ? '$green7Dark' : '$gray5Light'}
                    />
                  }>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      backgroundColor={'$listItemBackgroundColor'}
                      pressStyle={{ backgroundColor: '$listItemPressColor' }}
                      title="Settings"
                      icon={<FontAwesome5 solid size={22} name="cog" />}
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                      onPress={() => {
                        router.push('/(tabs)/optionstab/settings/');
                      }}
                    />
                  </YGroup.Item>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      pressTheme
                      onPress={() => {
                        router.push('/(tabs)/optionstab/mode/');
                      }}
                      backgroundColor={'$listItemBackgroundColor'}
                      pressStyle={{ backgroundColor: '$listItemPressColor' }}
                      title={colorScheme === 'dark' ? 'Dark-Mode' : 'Light-Mode'}
                      icon={
                        colorScheme === 'dark' ? (
                          <FontAwesome5 solid size={22} name="moon" />
                        ) : (
                          <FontAwesome5 solid size={22} name="sun" />
                        )
                      }
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                    />
                  </YGroup.Item>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      pressTheme
                      backgroundColor={'$listItemBackgroundColor'}
                      pressStyle={{ backgroundColor: '$listItemPressColor' }}
                      title="Account Settings"
                      icon={<FontAwesome5 solid size={22} name="user" />}
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                    />
                  </YGroup.Item>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      pressTheme
                      onPress={() => {
                        router.push('/(tabs)/optionstab/helpandsupport/');
                      }}
                      backgroundColor={'$listItemBackgroundColor'}
                      pressStyle={{ backgroundColor: '$listItemPressColor' }}
                      title="Help & Support"
                      icon={<FontAwesome5 solid size={22} name="question-circle" />}
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                    />
                  </YGroup.Item>
                  <YGroup.Item>
                    <ListItem
                      hoverTheme
                      pressTheme
                      backgroundColor={'$listItemBackgroundColor'}
                      pressStyle={{ backgroundColor: '$listItemDangerPressColor' }}
                      title="Log Out"
                      icon={<FontAwesome5 size={22} name="sign-out-alt" />}
                      scaleIcon={2}
                      size="$4.5"
                      iconAfter={<FontAwesome5 name="chevron-right" size={18} />}
                      onPress={handleLogoutPress}
                    />
                  </YGroup.Item>
                </YGroup>
              </View>
            </View>
            <View>
              <View $sm={styles.versioncrContainer}>
                <View style={styles.versionContainer}>
                  <Text style={styles.versionText}>Version 1.0.0</Text>
                </View>

                <View style={styles.copyrightContainer}>
                  <Text style={styles.copyrightText}>&copy; 2023 ଆମ ଗାଁ ହାଟ</Text>
                </View>
              </View>
            </View>
          </XStack>
        </>
      )}
    </>
  );
};

export default OptionsTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  versionContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 14,
    color: '#666',
  },
  copyrightContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 14,
    color: '#666',
  },
  versioncrContainer: {
    alignItems: 'center',
  },
});
