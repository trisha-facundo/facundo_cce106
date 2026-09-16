import { router } from "expo-router";
import { useState } from "react";
import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { tasks } from "../../../data/tasks";
import TaskCard from "../../components/TaskCard";

type Filter = "All" | "Pending" | "Completed";

export default function TasksScreen() {
  const [filter, setFilter] = useState<Filter>("All");

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    }

    return task.status === filter;
  });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>

        <Text style={styles.title}>My Tasks</Text>

        <Text style={styles.subtitle}>
          Manage your school activities.
        </Text>

        {/* FILTERS */}
        <View style={styles.filterRow}>

          <Pressable
            onPress={() => setFilter("All")}
            style={[
              styles.filterButton,
              filter === "All" && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === "All" && styles.activeFilterText,
              ]}
            >
              All
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter("Pending")}
            style={[
              styles.filterButton,
              filter === "Pending" && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === "Pending" && styles.activeFilterText,
              ]}
            >
              Pending
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setFilter("Completed")}
            style={[
              styles.filterButton,
              filter === "Completed" && styles.activeFilter,
            ]}
          >
            <Text
              style={[
                styles.filterText,
                filter === "Completed" &&
                  styles.activeFilterText,
              ]}
            >
              Completed
            </Text>
          </Pressable>

        </View>

        <Text style={styles.count}>
          Showing {filteredTasks.length} task(s)
        </Text>

        {/* TASK LIST */}
        <View style={styles.list}>
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              subject={task.subject}
              dueDate={task.dueDate}
              status={task.status}
              onPress={() => {
                router.push(`/task/${task.id}`);
              }}
            />
          ))}
        </View>

      </ScrollView>
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
  },

  subtitle: {
    marginTop: 5,
    color: "#64748b",
    fontSize: 15,
  },

  filterRow: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 12,
  },

  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
    marginRight: 8,
  },

  activeFilter: {
    backgroundColor: "#2563eb",
  },

  filterText: {
    color: "#475569",
    fontWeight: "600",
  },

  activeFilterText: {
    color: "#ffffff",
  },

  count: {
    color: "#64748b",
    marginBottom: 15,
  },

  list: {
    width: "100%",
  },
});