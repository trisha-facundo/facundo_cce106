import { ThemedText } from "@/components/themed-text";
import { useAuth } from '@/context/AuthContext';
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { users } from "../data/user";

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();


const handleLogin = () => {

      const user = users.find(
        (item) =>
          item.email.toLowerCase() === email.trim().toLowerCase() &&
          item.password === password
      );

      if (user) {
        login(user);

        router.replace({
          pathname: "/account/[id]",
          params: {
            id: user.id,
          },
        });
      } else {
        console.log("Invalid credentials");
      }
    };

  return (
    <View style={styles.container}>
      <View style={{marginBottom:15}}>
        <ThemedText darkColor="black" type="title" style={{marginBottom:15}}>Welcome back!</ThemedText>
        <ThemedText darkColor="gray" type="subtitle">Sign in to pick up where you left off.</ThemedText>
      </View>

      <View>
        <View>
          <ThemedText darkColor="#9CB080" type="micro">Email</ThemedText>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View>
          <ThemedText darkColor="#9CB080" type="micro">Password</ThemedText>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
          />
        </View>
      </View>

      <View>
        <ThemedText darkColor="black" type="link" style={{textAlign:"right"}}>
          <Link href="/sign-in">Forgot password?</Link>
        </ThemedText>
      </View>

      <Pressable
        style={styles.signInButton}
        onPress={handleLogin}
      >
        <ThemedText lightColor="#E8F5E9" type="subtitle" >Sign in</ThemedText>
      </Pressable>

      <View>
        <ThemedText darkColor="black" type="link" style={{textAlign:"center"}}>
          New here? <Link href="/sign-up" style={styles.link}>Create an account</Link>
        </ThemedText>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor:"#E8F5E9"
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor:"white"
  },
  signInButton: {
    alignItems:"center",
    backgroundColor: "#1B5E20",
    width: "100%",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  link: {
    color: "#1B5E20",
    fontWeight: "bold"
  }
});
