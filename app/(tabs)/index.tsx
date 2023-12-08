import { YStack, H2, Separator, Theme, Button, Input, TextArea } from 'tamagui';

import { useRouter } from 'expo-router';
import { useColorScheme } from 'react-native';
import { dark_active_Button, light_active_Button } from '@tamagui/themes/types/generated-new';
import { useState } from 'react';

export default function HomeTabScreen() {
  const theme = useColorScheme();
  const buttonTheme:any = () => {
    if (theme === 'dark') return 'green';
    else return 'light_active_button';
  };

  const router = useRouter();
  const handlebutton = () => {
    router.push('/loginModal');
  };
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <H2>Hometab</H2>
      <Separator />
      <Button onPress={handlebutton} theme={buttonTheme()}>
        Login
      </Button>
      <Input inlineImageLeft="search_icon" keyboardType='email-address' placeholder="hari" />
      <TextArea
        inlineImageLeft="search_icon"
        selectionColor={'limegreen'}
        cursorColor={'limegreen'}
        theme={'green'}
        width={400}
      />
    </YStack>
  );
}
