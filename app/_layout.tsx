import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { AuthProvider } from "../context/AuthContext";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="sign-up"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="account/[id]"
          options={{ headerShown: false }}
        />
      </Stack>

      <StatusBar style="auto" />
    </AuthProvider>
  );
}