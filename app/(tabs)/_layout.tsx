import { Tabs } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:"#1B5E20",
        headerShown: false,
        tabBarStyle: { height: 60 },
        tabBarBackground: () => (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: "#E8F5E9",
                    }}
                  />),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol
              size={24}
              name="house.fill"
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={24}
                name="person.fill"
                color={color}
              />
            ),
          }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
            tabBarIcon: ({ color }) => (
              <IconSymbol
                size={24}
                name="gearshape.fill"
                color={color}
              />
            ),
          }}
        />
      </Tabs>
  );
}
