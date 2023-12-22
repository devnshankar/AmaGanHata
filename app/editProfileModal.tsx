// LoginModal.tsx
import { useMutation } from '@apollo/client';
import { FontAwesome5 } from '@expo/vector-icons';
import { router, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, StyleSheet, useColorScheme } from 'react-native';
import { Avatar, Button, Input, ListItem, ScrollView, Separator, TextArea, View, YGroup } from 'tamagui';

import { UPDATE_USER } from '../Graphql/user.operations';
import ImagePickerExample from '../components/ImagePicker';
import { useLoginStore } from '../zustand/store';
import Toast from 'react-native-toast-message';
import { Base64 } from 'js-base64';

// Main updateusermodal component
const UpdateUserModal = () => {
  const { user, setUser } = useLoginStore();

  const router = useRouter();

  const [updateUser, { loading: updateUserLoading, error: updateUserError }] =
    useMutation(UPDATE_USER);

  const handleSaveChanges = async (formData: any) => {
    try {
      const base64Image = Base64.encode(formData.profileImageUrl);
      const { data: updateUserData } = await updateUser({
        variables: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: user?.email,
          password: user?.password,
          phoneNumber: formData.phoneNumber,
          profileImageUrl: base64Image, //!change this later
          address: formData.address,
          token: user?.token,
        },
      });
      setUser(updateUserData.updateUser);
      Toast.show({
        type: 'success',
        text1: 'Update Successful',
        text2: 'User updated in successfully !!!',
      });
      router.back();
    } catch (error) {
      console.error('Error updating user:', error);
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: 'There was a problem updating !!!',
      });
    }
  };
  return <UpdateUserForm onSubmit={handleSaveChanges} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
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

export default UpdateUserModal;

// SignupForm component
const UpdateUserForm = ({ onSubmit }: any) => {
  const colorScheme = useColorScheme();
  const { user } = useLoginStore();
  let decodedUri = '';
  if (user?.profileImageUrl !== null) {
    decodedUri = Base64.decode(user?.profileImageUrl || '').toString();
  }
  // const User = user;
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [profileImageUrl, setProfileImageUrl] = useState(decodedUri || '');
  const [address, setAddress] = useState(user?.address || '');

  const handleSubmit = () => {
    const formData = { firstName, lastName, phoneNumber, profileImageUrl, address };
    onSubmit(formData);
  };

  const onImageSelect = async (text: any) => {
    setProfileImageUrl(text);
  };
  return (
    <ScrollView $sm={{ backgroundColor: '$background' }}>
      <View>
        <View $sm={{ alignItems: 'center' }}>
          <Avatar $sm={{ margin: 90, marginBottom: 10 }} elevation={20} circular size="$12">
            <Avatar.Image
              src={
                profileImageUrl ? profileImageUrl : require('../assets/images/default-avatar.jpg')
              }
            />
          </Avatar>
          <ImagePickerExample onImageSelect={(text: any) => onImageSelect(text)} />
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
                title="FirstName"
                size="$4"
                icon={<FontAwesome5 solid size={22} name="user" marginLeft={8} />}
                scaleIcon={2}>
                <Input
                  value={firstName ? firstName : ''}
                  autoCapitalize="words"
                  onChangeText={(text) => setFirstName(text)}
                  $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
                />
              </ListItem>
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                hoverTheme
                backgroundColor="$listItemBackgroundColor"
                title="LastName"
                size="$4"
                icon={<FontAwesome5 solid size={22} name="user" marginLeft={8} />}
                scaleIcon={2}>
                <Input
                  autoCapitalize="words"
                  $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
                  value={lastName ? lastName : ''}
                  onChangeText={(text) => setLastName(text)}
                />
              </ListItem>
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                hoverTheme
                pressTheme
                backgroundColor="$listItemBackgroundColor"
                title="Phone"
                size="$4"
                icon={<FontAwesome5 solid size={22} name="phone-alt" marginLeft={8} />}
                scaleIcon={2}>
                <Input
                  keyboardType="phone-pad"
                  $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
                  value={phoneNumber ? phoneNumber : ''}
                  onChangeText={(text) => setPhoneNumber(text)}
                />
              </ListItem>
            </YGroup.Item>
            <YGroup.Item>
              <ListItem
                hoverTheme
                pressTheme
                size="$4"
                backgroundColor="$listItemBackgroundColor"
                title="Address"
                icon={<FontAwesome5 solid size={22} name="map-marked-alt" marginLeft={8} />}
                scaleIcon={2}
                >
                <Input
                  keyboardType="default"
                  $sm={{ ...styles.input, backgroundColor: '$background', color: '$color' }}
                  value={address ? address : ''}
                  onChangeText={(text) => setAddress(text)}
                />
              </ListItem>
            </YGroup.Item>
          </YGroup>
        </View>
      </View>

      <Button
        $sm={{ margin: 16, marginTop: 0 }}
        color="white"
        pressStyle={{ opacity: 0.7 }}
        backgroundColor="green"
        onPress={handleSubmit}>
        Save Changes
      </Button>
    </ScrollView>
  );
};
