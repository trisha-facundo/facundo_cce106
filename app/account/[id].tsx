import { View, Text } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { useEffect } from "react";

import { users } from "../../data/user";
import { useAuth } from '@/context/AuthContext';

export default function Account() {
  const { id } = useLocalSearchParams();

  const { login } = useAuth();

  const user = users.find((item) => item.id === id);

  useEffect(() => {
    if (user) {
      login(user);
      router.replace("/(tabs)");
    }
  }, [id]);

  if (!user) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text>User not found.</Text>
      </View>
    );
  }

  return null;
}