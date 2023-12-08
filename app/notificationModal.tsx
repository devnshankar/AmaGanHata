import { useTheme } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, YStack } from 'tamagui';
export default function NotificationModalScreen() {
  const { colors } = useTheme();
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Button
        backgroundColor={colors.background}
        color={'white'}
        elevation={12}
        onPress={showToast}>
        Show toast
      </Button>
    </YStack>
  );
}
