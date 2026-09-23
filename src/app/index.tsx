import { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors, Spacing } from '@/constants/theme';

type Quote = {
  quote: string;
  author: string;
};

const QUOTE_API_URL = 'https://dummyjson.com/quotes/random';

export default function HomeScreen() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];

  const [quote, setQuote] = useState<Quote | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQuote = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(QUOTE_API_URL);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      setQuote({ quote: data.quote, author: data.author });
    } catch {
      setError('Could not load a quote. Check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <Text style={[styles.label, { color: colors.textSecondary }]}>QUOTE OF THE DAY</Text>

        <View style={[styles.card, { backgroundColor: colors.backgroundElement }]}>
          {loading && <ActivityIndicator size="large" color={colors.text} />}

          {!loading && error && <Text style={styles.error}>{error}</Text>}

          {!loading && !error && quote && (
            <>
              <Text style={[styles.quote, { color: colors.text }]}>“{quote.quote}”</Text>
              <Text style={[styles.author, { color: colors.textSecondary }]}>— {quote.author}</Text>
            </>
          )}

          {!loading && !error && !quote && (
            <Text style={[styles.author, { color: colors.textSecondary }]}>No quote yet.</Text>
          )}
        </View>

        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={fetchQuote}
          disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Loading…' : 'New Quote'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    letterSpacing: 1.5,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    borderRadius: Spacing.three,
    padding: Spacing.five,
    minHeight: 160,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.three,
  },
  quote: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 28,
  },
  author: {
    fontSize: 15,
    fontWeight: '500',
  },
  error: {
    color: '#D64545',
    textAlign: 'center',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#3c87f7',
    paddingVertical: Spacing.three,
    paddingHorizontal: Spacing.five,
    borderRadius: Spacing.three,
  },
  buttonPressed: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
