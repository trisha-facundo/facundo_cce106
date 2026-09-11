
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {


  return (
    <>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="sign-up"
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="modal"
          options={{
            presentation: 'modal',
            title: 'Modal',
          }}
        />
      </Stack>

      <StatusBar style="auto" />
    </>
  );
}
