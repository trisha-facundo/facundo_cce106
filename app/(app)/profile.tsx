import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type User } from '@/context/AuthContext';
import { useAuth } from '@/hooks/useAuth';
import { getProfile } from '@/lib/api';

export default function ProfileScreen() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProfile = async () => {
    // Show the loading state and clear any previous error.
    setLoading(true);
    setError('');

    try {
      // GET /profile with the Bearer token (see lib/api.ts).
      const data = await getProfile(token);
      setProfile(data);
    } catch (err) {
      setError(
        err instanceof TypeError
          ? 'Cannot reach the server. Make sure the API is running (npm run api).'
          : err instanceof Error
            ? err.message
            : 'Something went wrong while loading your profile.'
      );
    } finally {
      // Always stop loading, whether the request worked or failed.
      setLoading(false);
    }
  };

  // Load the profile once when the screen opens.
  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>MY PROFILE</Text>
      <View style={styles.card}>
        {loading ? (
          <View style={styles.state}><ActivityIndicator color="#245bb2" /><Text style={styles.text}>Loading profile…</Text></View>
        ) : error ? (
          <View style={styles.state} accessibilityLiveRegion="polite">
            <Text style={styles.error}>{error}</Text>
            <Pressable accessibilityRole="button" onPress={loadProfile}><Text style={styles.link}>Try Again</Text></Pressable>
          </View>
        ) : (
          <>
            <Text style={styles.text}>Name: {profile?.name || '—'}</Text>
            <Text style={styles.text}>Email: {profile?.email || '—'}</Text>
            <Text style={styles.text}>Role: {profile?.role || '—'}</Text>
          </>
        )}
      </View>
      <Text style={styles.text}>Session Status: {token ? 'Authenticated' : 'Not Available'}</Text>
      <Pressable accessibilityRole="button" style={styles.button} onPress={logout}><Text style={styles.buttonText}>LOGOUT</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 24, fontWeight: '700' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  note: { color: '#536579', fontSize: 12 },
  state: { gap: 12, alignItems: 'center' },
  error: { color: '#b42318' },
  link: { color: '#245bb2', padding: 12 },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
