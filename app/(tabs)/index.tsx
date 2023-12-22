import { dark_active_Button, light_active_Button } from '@tamagui/themes/types/generated-new';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useColorScheme } from 'react-native';
import { YStack, H2, Separator, Theme, Button, Input, TextArea } from 'tamagui';
import { useLoginStore } from 'zustand/store';

export default function HomeTabScreen() {
  const theme = useColorScheme();
  const { user } = useLoginStore();
  const buttonTheme: any = () => {
    if (theme === 'dark') return 'dark_active_button';
    else return 'light_active_button';
  };

  const router = useRouter();
  const handlebutton = () => {
    router.push('/loginModal');
  };
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <Button color={"$color"} backgroundColor={'green'} onPress={() => router.push('/(tabs)/salestab/myproducts/')}>
        producttab
      </Button>
      <H2>Hometab</H2>
      <Separator />
      <Button onPress={handlebutton} theme={buttonTheme()}>
        Login
      </Button>
      <Input keyboardType="email-address" placeholder="hari" />
      <TextArea
        inlineImageLeft="search_icon"
        selectionColor="limegreen"
        cursorColor="limegreen"
        width={400}
      />
    </YStack>
  );
}
