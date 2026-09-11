import { View, Pressable,TextInput, StyleSheet} from "react-native";
import { router, Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { useState } from "react";

export default function SignIn() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <View style={{marginBottom:15}}>
        <ThemedText darkColor="black" type="title" style={{marginBottom:15}}>Create your account</ThemedText>
        <ThemedText darkColor="gray" type="subtitle">It only takes a minute to get started.</ThemedText>
      </View>

      <View>
        <View>
          <ThemedText darkColor="#9CB080" type="micro">Fullname</ThemedText>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
        </View>
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

      <Pressable
        style={styles.signInButton}
        onPress={() => router.replace("/(tabs)")}
      >
        <ThemedText lightColor="#E8F5E9" type="subtitle" >Sign up</ThemedText>
      </Pressable>

      <View>
        <ThemedText darkColor="black" type="default" style={{textAlign:"center"}}>
          Already have an account? <Link href="/sign-in" style={styles.link}>Sign in</Link>
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
