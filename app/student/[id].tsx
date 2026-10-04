import { useEffect, useState } from 'react';
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { type Student } from '@/components/StudentCard';
import { useAuth } from '@/hooks/useAuth';
import { ApiError, getStudent } from '@/lib/api';

export default function StudentDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { token, authLoading } = useAuth();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = async () => {
    // Validate the id from the route (/student/1 -> id = "1").
    if (!id) {
      setError('No student ID was provided.');
      setLoading(false);
      return;
    }

    // Show the loading state and clear any previous result.
    setLoading(true);
    setError('');
    setStudent(null);

    try {
      // GET /students/{id} with the Bearer token (see lib/api.ts).
      const data = await getStudent(id, token);
      setStudent(data);
    } catch (err) {
      if (err instanceof ApiError && err.status === 404) {
        // Not found: leave student empty so the "Student not found" message shows.
      } else {
        setError(
          err instanceof TypeError
            ? 'Cannot reach the server. Make sure the API is running (npm run api).'
            : err instanceof Error
              ? err.message
              : 'Something went wrong while loading the student.'
        );
      }
    } finally {
      // Always stop loading, whether the request worked or failed.
      setLoading(false);
    }
  };

  // Load again whenever the id in the URL changes.
  useEffect(() => {
    loadStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload only when id changes
  }, [id]);

  // Route protection: unauthenticated users go to the real /sign-in URL.
  if (authLoading) return null;
  if (!token) return <Redirect href="/sign-in" />;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      {loading ? <View style={styles.state}><ActivityIndicator color="#245bb2" /><Text style={styles.text}>Loading student…</Text></View>
        : error ? <Text style={styles.error} accessibilityLiveRegion="polite">{error}</Text>
        : !student ? <Text style={styles.text}>Student not found.</Text> : null}
      {student ? (
        <View style={styles.card}>
          <Text style={styles.text}>ID: {student.id ?? id}</Text>
          <Text style={styles.text}>Name: {student.name || '—'}</Text>
          <Text style={styles.text}>Email: {student.email || '—'}</Text>
          <Text style={styles.text}>Course: {student.course || '—'}</Text>
        </View>
      ) : null}
      <Pressable accessibilityRole="button" style={styles.button} onPress={() => router.back()}><Text style={styles.buttonText}>Back</Text></Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 24, gap: 20, backgroundColor: '#f2f5fa' },
  title: { color: '#17324d', fontSize: 28, fontWeight: '700' },
  state: { gap: 12, alignItems: 'center' },
  card: { backgroundColor: '#ffffff', padding: 20, gap: 16, borderRadius: 12 },
  text: { color: '#536579', fontSize: 16 },
  error: { color: '#b42318' },
  button: { backgroundColor: '#245bb2', padding: 16, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#ffffff', fontWeight: '600' },
});
