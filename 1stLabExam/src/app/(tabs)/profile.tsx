import { useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const [name, setName] = useState("Jhonder");
  const [program, setProgram] = useState("BS Information Technology");

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const [errorProgram, setErrorProgram] = useState("");
  const [savedProgram, setSavedProgram] = useState(false);

  const handleSave = () => {
    if (name.trim() === "") {
      setError("Full name is required.");
      setSaved(false);
      return;
    }

    setError("");
    setSaved(true);

    if (program.trim() ===""){
        setErrorProgram("Program is required.")
        setSavedProgram(false)
        return;
    }
    setErrorProgram("");
    setSavedProgram(true);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <Text style={styles.title}>
          My Profile
        </Text>

        <View style={styles.profileCard}>

          <Image
            source={require("../../../assets/images/logo.png")}
            style={styles.avatar}
          />

          <Text style={styles.avatarName}>
            {name || "Student"}
          </Text>

          <Text style={styles.avatarProgram}>
            {program}
          </Text>

        </View>

        <Text style={styles.label}>
          Full Name
        </Text>

        <TextInput
          value={name}
          onChangeText={(text) => {
            setName(text);
            setSaved(false);
          }}
          placeholder="Enter your full name"
          style={[
            styles.input,
            error !== "" && styles.inputError,
          ]}
        />

        {error !== "" && (
          <Text style={styles.error}>
            {error}
          </Text>
        )}

        <Text style={styles.label}>
          Program / Course
        </Text>

        <TextInput
          value={program}
          onChangeText={(text) => {
            setProgram(text);
            setSaved(false);
          }}
          placeholder="Enter your program"
          style={[styles.input,
            errorProgram !== "" && styles.inputError,
          ]}
        />
        {errorProgram !== "" && (
          <Text style={styles.error}>
            {errorProgram}
          </Text>
        )}

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.saveText}>
            Save Profile
          </Text>
        </Pressable>

        {saved && savedProgram &&(
          <View style={styles.successBox}>
            <Text style={styles.successText}>
               Profile saved successfully!
            </Text>
          </View>
        )}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  container: {
    padding: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 20,
  },

  profileCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    marginBottom: 25,
    elevation: 2,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },

  avatarName: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
  },

  avatarProgram: {
    color: "#64748b",
    marginTop: 4,
    textAlign: "center",
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 7,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
  },

  inputError: {
    borderColor: "#dc2626",
  },

  error: {
    color: "#dc2626",
    marginTop: 5,
    fontSize: 13,
  },

  saveButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 25,
  },

  saveText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },

  pressed: {
    opacity: 0.6,
  },

  successBox: {
    marginTop: 15,
    backgroundColor: "#dcfce7",
    borderRadius: 12,
    padding: 14,
  },

  successText: {
    color: "#166534",
    fontWeight: "700",
    textAlign: "center",
  },
});