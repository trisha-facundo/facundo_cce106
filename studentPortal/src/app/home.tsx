import { Redirect } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { MaxContentWidth, Spacing } from '@/constants/theme';
import { useAuth } from '@/contexts/auth-context';

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <ThemedView style={styles.infoRow}>
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
      <ThemedText type="smallBold">{value}</ThemedText>
    </ThemedView>
  );
}

export default function HomeScreen() {
  const { user, logout, refreshProfile, simulateExpiredSession } = useAuth();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isExpiring, setIsExpiring] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!user) {
    return <Redirect href="/login" />;
  }

  const handleRefresh = async () => {
    setStatusMessage(null);
    setIsRefreshing(true);
    try {
      await refreshProfile();
      setStatusMessage('Profile refreshed from the protected endpoint.');
    } catch {
      setStatusMessage('Session expired — logged out.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSimulateExpiry = async () => {
    setStatusMessage(null);
    setIsExpiring(true);
    await simulateExpiredSession();
    setIsExpiring(false);
  };

  return (
    <ThemedView style={styles.screen}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
          <ThemedView style={styles.header}>
            <ThemedText type="title" style={styles.title}>
              Hi, {user.name.split(' ')[0]}
            </ThemedText>
            <ThemedView style={styles.roleBadge}>
              <ThemedText type="small" style={styles.roleBadgeText}>
                {user.role.toUpperCase()}
              </ThemedText>
            </ThemedView>
          </ThemedView>

          <ThemedView type="backgroundElement" style={styles.card}>
            <InfoRow label="Full name" value={user.name} />
            <InfoRow label="Email" value={user.email} />
            <InfoRow label="ID number" value={user.studentId} />
            <InfoRow label="Program" value={user.program} />
            {user.role === 'student' && (
              <>
                <InfoRow label="Year level" value={String(user.yearLevel)} />
                <InfoRow label="GPA" value={user.gpa.toFixed(2)} />
              </>
            )}
          </ThemedView>

          {user.role === 'admin' ? (
            <ThemedView type="backgroundElement" style={styles.card}>
              <ThemedText type="smallBold">Admin tools</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Faculty accounts can manage enrollment and view student records here.
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView type="backgroundElement" style={styles.card}>
              <ThemedText type="smallBold">My enrollment</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                You are currently enrolled for this term. Grades and schedule would appear here.
              </ThemedText>
            </ThemedView>
          )}

          {statusMessage && (
            <ThemedView type="backgroundElement" style={styles.card}>
              <ThemedText type="small">{statusMessage}</ThemedText>
            </ThemedView>
          )}

          <Pressable onPress={handleRefresh} disabled={isRefreshing} style={styles.button}>
            {isRefreshing ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <ThemedText style={styles.buttonText}>Refresh profile (protected request)</ThemedText>
            )}
          </Pressable>

          <Pressable
            onPress={handleSimulateExpiry}
            disabled={isExpiring}
            style={[styles.button, styles.secondaryButton]}>
            {isExpiring ? (
              <ActivityIndicator color="#208AEF" />
            ) : (
              <ThemedText style={styles.secondaryButtonText}>Simulate expired session (test 401)</ThemedText>
            )}
          </Pressable>

          <Pressable onPress={logout} style={[styles.button, styles.logoutButton]}>
            <ThemedText style={styles.logoutButtonText}>Log out</ThemedText>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    alignItems: 'stretch',
    alignSelf: 'center',
    width: '100%',
    maxWidth: MaxContentWidth,
    paddingHorizontal: Spacing.four,
    paddingVertical: Spacing.four,
    gap: Spacing.three,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
  },
  roleBadge: {
    backgroundColor: '#208AEF',
    borderRadius: Spacing.two,
    paddingHorizontal: Spacing.two,
    paddingVertical: Spacing.one,
  },
  roleBadgeText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  card: {
    borderRadius: Spacing.three,
    padding: Spacing.three,
    gap: Spacing.two,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  button: {
    backgroundColor: '#208AEF',
    borderRadius: Spacing.two,
    paddingVertical: Spacing.three,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#208AEF',
  },
  secondaryButtonText: {
    color: '#208AEF',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'transparent',
  },
  logoutButtonText: {
    color: '#D93025',
    fontWeight: '600',
  },
});
