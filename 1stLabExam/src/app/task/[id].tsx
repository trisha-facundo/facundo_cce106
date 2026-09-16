import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tasks } from "../../../data/tasks";

export default function TaskDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const task = tasks.find((item) => item.id === id);

  const [status, setStatus] = useState<
    "Pending" | "Completed"
  >(task?.status ?? "Pending");

  if (!task) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>
            Task Not Found
          </Text>

          <Text style={styles.errorText}>
            No task exists with ID: {id}
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>
              Go Back
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const toggleStatus = () => {
    setStatus((current) =>
      current === "Pending"
        ? "Completed"
        : "Pending"
    );
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>

        <View style={styles.card}>

          <Text style={styles.subject}>
            {task.subject}
          </Text>

          <Text style={styles.title}>
            {task.title}
          </Text>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              Due Date
            </Text>

            <Text style={styles.value}>
              {task.dueDate}
            </Text>
          </View>

          <View style={styles.infoBox}>
            <Text style={styles.label}>
              Status
            </Text>

            <Text
              style={[
                styles.value,
                status === "Completed"
                  ? styles.completed
                  : styles.pending,
              ]}
            >
              {status}
            </Text>
          </View>

          <Pressable
            onPress={toggleStatus}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.buttonText}>
              {status === "Pending"
                ? "Mark as Completed"
                : "Mark as Pending"}
            </Text>
          </Pressable>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backText}>
              Back
            </Text>
          </Pressable>

        </View>

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
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 24,
    elevation: 3,
  },

  subject: {
    color: "#2563eb",
    fontWeight: "700",
    fontSize: 14,
  },

  title: {
    fontSize: 27,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 8,
    marginBottom: 20,
  },

  infoBox: {
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },

  label: {
    color: "#64748b",
    fontSize: 12,
  },

  value: {
    color: "#0f172a",
    fontWeight: "700",
    fontSize: 16,
    marginTop: 4,
  },

  completed: {
    color: "#16a34a",
  },

  pending: {
    color: "#d97706",
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  pressed: {
    opacity: 0.6,
  },

  buttonText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },

  backButton: {
    padding: 15,
    alignItems: "center",
  },

  backText: {
    color: "#2563eb",
    fontWeight: "700",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
  },

  errorTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#dc2626",
  },

  errorText: {
    marginTop: 8,
    color: "#64748b",
    textAlign: "center",
  },
});