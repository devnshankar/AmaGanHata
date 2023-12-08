import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { YStack, Paragraph, Separator, Theme } from 'tamagui';

import EditScreenInfo from '../components/edit-screen-info';

export default function ModalScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <StatusBar style={Platform.OS === 'ios' ? 'light' : 'dark'} />
        <Paragraph>Modal</Paragraph>
        <Separator />
        <Paragraph> hello guys </Paragraph>
        <EditScreenInfo path="app/modal.tsx" />
      </YStack>
    </Theme>
  );
}
