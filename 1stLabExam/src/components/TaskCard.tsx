import { Pressable, StyleSheet, Text, View } from "react-native";

type TaskCardProps = {
  title: string;
  subject: string;
  dueDate: string;
  status: "Pending" | "Completed";
  onPress?: () => void;
};

export default function TaskCard({
  title,
  subject,
  dueDate,
  status,
  onPress,
}: TaskCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>

        <View
          style={[
            styles.badge,
            status === "Completed"
              ? styles.completedBadge
              : styles.pendingBadge,
          ]}
        >
          <Text style={styles.badgeText}>{status}</Text>
        </View>
      </View>

      <Text style={styles.subject}>{subject}</Text>

      <Text style={styles.date}>Due: {dueDate}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  pressed: {
    opacity: 0.7,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    flex: 1,
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
    marginRight: 10,
  },

  subject: {
    marginTop: 8,
    fontSize: 14,
    color: "#64748b",
  },

  date: {
    marginTop: 6,
    fontSize: 13,
    color: "#94a3b8",
  },

  badge: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 20,
  },

  pendingBadge: {
    backgroundColor: "#fef3c7",
  },

  completedBadge: {
    backgroundColor: "#dcfce7",
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
});