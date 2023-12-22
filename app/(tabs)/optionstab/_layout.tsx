import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function SalesTabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Options',
          headerLeft: () => (
            <Pressable
              onPress={() => {
                router.back();
              }}>
              {({ pressed }) => (
                <Ionicons
                  name="arrow-back"
                  size={28}
                  color="gray"
                  style={[styles.headerLeft, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="helpandsupport"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="mode"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="myorders"
        options={{
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  headerLeft: {
    marginLeft: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
