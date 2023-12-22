import { Ionicons } from '@expo/vector-icons';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, StyleSheet } from 'react-native';

export default function SalesTabLayout() {
  const router = useRouter();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarStyle: {
          display: 'none',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sales',
          headerLeft: () => (
            <Pressable onPress={() => {router.back()}}>
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
        name="myproducts"
        
        options={{
          title: 'My Products',
          headerShown:false,
          headerLeft: () => (
            <Pressable onPress={() => {router.back()}}>
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
