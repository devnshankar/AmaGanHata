import { useRouter } from 'expo-router';
import { YStack, H2, Separator, Button } from 'tamagui';

export default function TabTwoScreen() {
  const router = useRouter();
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <H2>Tab Two</H2>
      <Separator />
      <Button
        backgroundColor={'limegreen'}
        color={'white'}
        elevation={12}
        onPress={() => {
          router.push('/loginModal');
        }}>
        Log in
      </Button>
    </YStack>
  );
}
