import { useMutation } from '@apollo/client';
import { FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Mail, MapPin, Phone, User2, UserCog2 } from '@tamagui/lucide-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, useColorScheme, ActivityIndicator, Image } from 'react-native';
import {
  Avatar,
  Button,
  Input,
  ListItem,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YGroup,
} from 'tamagui';

import { useLoginStore } from './../../../zustand/store';
import { UPDATE_USER } from '../../../Graphql/user.operations';

export default function ProfileScreen() {
  const [loading, setLoading] = React.useState(true);

  const colorScheme = useColorScheme();

  const router = useRouter();

  // const { user, forceRender, setForceRender } = useLoginStore((state) => ({
  //   user: state.user,
  //   forceRender: state.forceRender,
  //   setForceRender: state.setForceRender,
  // }));
  const { user } = useLoginStore();

  const { setUser } = useLoginStore();
  // Dummy user data (replace with actual user data from your authentication system)
  const User = {
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
    avatar: user?.profileImageUrl,
    defaultAvatar: require('../../../assets/images/default-avatar.jpg'),
    phoneNumber: user?.phoneNumber,
    address: user?.address,
  };

  const handleEditButton = () => {
    // router.push('/(modals)/updateUserModal');
  };
  const handleUpdateUserSubmission = () => {
    console.log('View Order History');
    // Implement logic for Order History
  };

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] =
    useMutation(UPDATE_USER);

  const handleSaveChanges = async (formData: any) => {
    try {
      const { data: updateUserData } = await updateUser({
        variables: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: user?.password,
          phoneNumber: formData.phoneNumber,
          profileImageUrl: formData.profileImageUrl,
          address: formData.address,
          token: user?.token,
        },
      });
      setUser(updateUserData.updateUser);
      // setForceRender(forceRender + 1);
      // console.log('USER_UPDATED_SUCCESSFULLY', JSON.stringify(updateUserData, null, 2));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };
  const theme = useColorScheme();
  const buttonTheme: any = () => {
    if (theme === 'dark') return 'green';
    else return 'red';
  };
  React.useEffect(() => {
    // Set loading to true when starting to fetch data
    setLoading(true);

    // Your data fetching logic goes here

    // Set loading to false when data fetching is complete
    setLoading(false);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <ScrollView $sm={styles.container}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text>Loading...</Text>
        </View>
      ) : (
        <View $sm={{ backgroundColor: 'gray' }}>
          <View $sm={{ backgroundColor: 'green', alignItems: 'center' }}>
            <Avatar $sm={{ margin: 20 }} elevation={20} circular size="$12">
              <Avatar.Image
                src={
                  User.avatar ? User.avatar : require('../../../assets/images/default-avatar.jpg')
                }
              />
            </Avatar>
          </View>
          <View $sm={{ margin: 16 }}>
            <Button theme={buttonTheme()}>{User.firstName ? User.firstName : 'no email'}</Button>
            <Text color="$color.gray8Light">{User.lastName ? User.lastName : 'no email'}</Text>
            <Text color="$color.gray8Light">{User.email ? User.email : 'no email'}</Text>
            <Text color="$color.gray8Light">
              {User.phoneNumber ? User.phoneNumber : 'No number'}
            </Text>
            <Text color="$color.gray8Light">{User.address ? User.address : 'No address'}</Text>
            <Text color="$color.gray8Light">{User.avatar ? User.avatar : 'No address'}</Text>
          </View>
          <XStack $sm={{ padding: 16, paddingTop: 0 }}>
            <YGroup
              alignSelf="center"
              bordered
              width="100%"
              size="$5"
              elevate
              borderColor="limegreen"
              elevation={12}
              separator={<Separator borderColor="limegreen" />}>
              <YGroup.Item>
                <ListItem
                  title="Name"
                  subTitle={
                    (User.firstName || 'No firstName') + ' ' + (User.lastName || 'No lastName')
                  }
                  size="$4"
                  backgroundColor="green"
                  pressStyle={{ backgroundColor: 'darkgreen' }}
                  icon={<FontAwesome5 size={22} name="user" />}
                />
              </YGroup.Item>
            </YGroup>
          </XStack>
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
