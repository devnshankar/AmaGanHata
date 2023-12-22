import { FontAwesome5 } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useState, useEffect } from 'react';
import { Platform, Alert, useColorScheme } from 'react-native';
import { View } from 'tamagui';

export default function ImagePickerExample({ onImageSelect }: any) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert(
            'Permission Denied',
            'Sorry, we need camera roll permissions to make this work!'
          );
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    // console.log(JSON.stringify(result, null, 4))
    if (!result.canceled) {
      // Use uri from the first asset in the assets array
      const imageUri: any = result.assets && result.assets.length > 0 ? result.assets[0].uri : null;
      setImage(imageUri);
      onImageSelect(imageUri);
    }
  };
  const colorScheme = useColorScheme();
  return (
    <View
      // onPress={handleEditButton}
      onPress={pickImage}
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
      <FontAwesome5 name="plus" size={15} color={colorScheme === 'dark' ? '#bababa' : 'white'} />
    </View>
  );
}
