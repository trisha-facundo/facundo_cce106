import { Link } from "expo-router";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tasks } from "../../../data/tasks";
import StatCard from "../../components/StatCard";

export default function Dashboard() {
  const total = tasks.length;

  const completed = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pending = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.smallText}>StudyFlow</Text>

        <Text style={styles.title}>
          Welcome, Jhonder!
        </Text>

        <Text style={styles.subtitle}>
          Stay organized and keep up with your studies.
        </Text>

        <View style={styles.statsRow}>
          <StatCard
            label="Total Tasks"
            value={total}
          />

          <StatCard
            label="Completed"
            value={completed}
          />

          <StatCard
            label="Pending"
            value={pending}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>
        </View>

        <Link href="/(tabs)/tasks" asChild>
          <Pressable style={styles.primaryButton}>
            <Text style={styles.primaryText}>
              View My Tasks
            </Text>
          </Pressable>
        </Link>

        <Link href="/(tabs)/profile" asChild>
          <Pressable style={styles.secondaryButton}>
            <Text style={styles.secondaryText}>
              Edit Profile
            </Text>
          </Pressable>
        </Link>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F9F8F6",
  },

  container: {
    padding: 20,
  },

  smallText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2563eb",
    marginBottom: 8,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
  },

  subtitle: {
    fontSize: 15,
    color: "#64748b",
    marginTop: 8,
    lineHeight: 22,
  },

  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginHorizontal: -5,
  },

  sectionHeader: {
    marginTop: 25,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
  },

  primaryButton: {
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },

  secondaryButton: {
    backgroundColor: "#e2e8f0",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  secondaryText: {
    color: "#0f172a",
    fontSize: 16,
    fontWeight: "700",
  },
});