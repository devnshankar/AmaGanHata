import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Base64 } from 'js-base64';
import React from 'react';
import { StyleSheet, useColorScheme, ActivityIndicator } from 'react-native';
import {
  Avatar,
  ListItem,
  ScrollView,
  Separator,
  Text,
  View,
  YGroup,
} from 'tamagui';

import { useLoginStore } from './../../../zustand/store';

export default function ProfileScreen() {
  const [loading, setLoading] = React.useState(true);

  const colorScheme = useColorScheme();

  const router = useRouter();

  const { user, setUser } = useLoginStore();

  let decodedUri = '';
  if (user?.profileImageUrl !== null) {
    decodedUri = Base64.decode(user?.profileImageUrl || '').toString();
  }
  const User = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    avatar: decodedUri,
    defaultAvatar: require('../../../assets/images/default-avatar.jpg'),
    phoneNumber: user?.phoneNumber,
    address: user?.address,
  };

  const handleEditButton = () => {
    router.push('/editProfileModal');
  };
  // const theme = useColorScheme();
  // const buttonTheme: any = () => {
  //   if (theme === 'dark') return 'white';
  //   else return 'red';
  // };

  React.useEffect(() => {
    // Set loading to true when starting to fetch data
    setLoading(true);

    // Your data fetching logic goes here

    // Set loading to false when data fetching is complete
    setLoading(false);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <ScrollView $sm={{ ...styles.container, backgroundColor: '$background' }}>
      {loading ? (
        <View style={{ ...styles.loadingContainer }}>
          <ActivityIndicator
            style={{ alignSelf: 'center', marginTop: '50%' }}
            size="large"
            color="green"
          />
        </View>
      ) : (
        <View>
          <View $sm={{ alignItems: 'center' }}>
            <Avatar $sm={{ margin: 20, marginBottom: 10 }} elevation={20} circular size="$12">
              <Avatar.Image
                src={
                  User.avatar ? User.avatar : require('../../../assets/images/default-avatar.jpg')
                }
              />
            </Avatar>
            <View
              onPress={handleEditButton}
              pressStyle={{ opacity: 0.9 }}
              $sm={{
                backgroundColor: '$green7Dark',
                padding: 14,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: 10,
                right: 130,
              }}>
              <FontAwesome5
                name="pen"
                size={15}
                color={colorScheme === 'dark' ? '#bababa' : 'white'}
              />
            </View>
          </View>
          <View $sm={{ margin: 16 }}>
            <YGroup
              alignSelf="center"
              bordered
              width="100%"
              elevation={8}
              borderColor={colorScheme === 'dark' ? '$green7Dark' : 'white'}
              separator={
                <Separator borderColor={colorScheme === 'dark' ? '$green7Dark' : '$gray5Light'} />
              }>
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  backgroundColor="$listItemBackgroundColor"
                  title="Name"
                  subTitle={
                    User.firstName || User.lastName ? User.firstName + ' ' + User.lastName : 'NaN'
                  }
                  size="$4"
                  icon={<FontAwesome5 solid size={22} name="user" />}
                  scaleIcon={2}
                  iconAfter={
                    <View pressStyle={{ opacity: 0.5 }} onPress={handleEditButton}>
                      <FontAwesome5
                        name="edit"
                        size={18}
                        color={colorScheme === 'dark' ? '#bababa' : 'darkgreen'}
                      />
                    </View>
                  }
                />
              </YGroup.Item>
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  pressTheme
                  backgroundColor="$listItemBackgroundColor"
                  title="Email"
                  size="$4"
                  subTitle={User.email ? User.email : 'NaN'}
                  icon={<FontAwesome5 solid size={22} name="envelope" />}
                  scaleIcon={2}
                  iconAfter={
                    <View pressStyle={{ opacity: 0.5 }} onPress={handleEditButton}>
                      <FontAwesome5
                        name="edit"
                        size={18}
                        color={colorScheme === 'dark' ? '#bababa' : 'darkgreen'}
                      />
                    </View>
                  }
                />
              </YGroup.Item>
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  pressTheme
                  size="$4"
                  backgroundColor="$listItemBackgroundColor"
                  title="Phone"
                  subTitle={User.phoneNumber ? User.phoneNumber : 'NaN'}
                  icon={<FontAwesome5 solid size={22} name="phone-alt" />}
                  scaleIcon={2}
                  iconAfter={
                    <View pressStyle={{ opacity: 0.5 }} onPress={handleEditButton}>
                      <FontAwesome5
                        name="edit"
                        size={18}
                        color={colorScheme === 'dark' ? '#bababa' : 'darkgreen'}
                      />
                    </View>
                  }
                />
              </YGroup.Item>
              <YGroup.Item>
                <ListItem
                  hoverTheme
                  pressTheme
                  size="$4"
                  backgroundColor="$listItemBackgroundColor"
                  title="Address"
                  subTitle={User.address ? User.address : 'NaN'}
                  icon={<FontAwesome5 solid size={22} name="map-marked-alt" />}
                  scaleIcon={2}
                  iconAfter={
                    <View pressStyle={{ opacity: 0.5 }} onPress={handleEditButton}>
                      <FontAwesome5
                        name="edit"
                        size={18}
                        color={colorScheme === 'dark' ? '#bababa' : 'darkgreen'}
                      />
                    </View>
                  }
                />
              </YGroup.Item>
            </YGroup>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  userInfoContainer: {
    marginBottom: 16,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: '80%',
  },
  profileOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 16,
  },
  optionIcon: {
    marginLeft: 'auto',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

// <>
//   <View $sm={{ alignItems: 'center', margin: 16 }}>
//     {User.avatar ? (
//       <Avatar circular size="$12">
//         <Avatar.Image src={User.avatar} />
//       </Avatar>
//     ) : (
//       <Avatar circular size="$12">
//         <Avatar.Image src={User.defaultAvatar} />
//       </Avatar>
//     )}
//   </View>
//   <View
//     $sm={{
//       padding: 16,
//       paddingBottom: 10,
//       flex: 1,
//       justifyContent: 'space-between',
//       flexDirection: 'row',
//     }}>
//     <Text $sm={{ fontSize: 18, fontWeight: 'bold' }} color="$color">
//       Personal info
//     </Text>
//     <Text
//       onPress={handleEditButton}
//       $sm={{ fontSize: 18, fontWeight: 'bold' }}
//       color="$color">
//       Edit
//     </Text>
//   </View>
//   <XStack $sm={{ padding: 16, paddingTop: 0 }}>
//     <YGroup
//       alignSelf="center"
//       bordered
//       width="100%"
//       size="$5"
//       elevate
//       elevation={12}
//       separator={<Separator borderColor="$septr" />}>
//       <YGroup.Item>
//         <ListItem
//           hoverTheme
//           title="Name"
//           subTitle={User.firstName + ' ' + User.lastName}
//           icon={User2}
//           scaleIcon={2}
//           size="$4"
//           backgroundColor="$listItemBackground"
//         />
//       </YGroup.Item>
//       {/* <Separator borderColor={'$septr'} /> */}
//       <YGroup.Item>
//         <ListItem
//           hoverTheme
//           pressTheme
//           title="Email"
//           subTitle={User.email}
//           icon={Mail}
//           scaleIcon={2}
//           size="$4"
//           backgroundColor="$listItemBackground"
//         />
//       </YGroup.Item>
//       {/* <Separator borderColor={'$septr'} /> */}
//       <YGroup.Item>
//         <ListItem
//           hoverTheme
//           pressTheme
//           title="Phone"
//           subTitle={User.phoneNumber}
//           icon={Phone}
//           scaleIcon={2}
//           size="$4"
//           backgroundColor="$listItemBackground"
//         />
//       </YGroup.Item>
//       <YGroup.Item>
//         <ListItem
//           hoverTheme
//           pressTheme
//           title="Address"
//           subTitle={User.address}
//           icon={MapPin}
//           scaleIcon={2}
//           size="$4"
//           backgroundColor="$listItemBackground"
//         />
//       </YGroup.Item>
//     </YGroup>
//   </XStack>
// </>
