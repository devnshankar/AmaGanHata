import { StatusBar } from 'react-native';
import Toast from 'react-native-toast-message';
import { Button, YStack } from 'tamagui';
export default function LoginModalScreen() {
  const showToast = () => {
    Toast.show({
      type: 'error',
      text1: 'Hello',
      text2: 'This is some something 👋',
    });
  };
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <StatusBar />
      <Button backgroundColor={'limegreen'} color={'white'} elevation={12} onPress={showToast}>
        Show toast
      </Button>
    </YStack>
  );
}
