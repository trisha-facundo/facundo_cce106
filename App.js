import React, { useEffect, useState } from 'react';
import {ActivityIndicator,Pressable, ScrollView,StyleSheet,Text,TextInput,View,Image} from "react-native";

import { SafeAreaView } from 'react-native-safe-area-context';

import { loginUser, getCurrentUser } from './src/services/authService';

import { saveToken, getToken, deleteToken,} from './src/storage/token';

export default function App() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    restoreSession();
  }, []);

  async function restoreSession() {
    try {
      setLoading(true);
      setError('');

      const token = await getToken();

      if (!token) {
        setProfile(null);
        return;
      }

      try {
        const user = await getCurrentUser(token);
        setProfile(user);
      } catch (sessionError) {
        await deleteToken();
        setProfile(null);
        setError('Your session has expired. Please log in again.');
      }
    } catch (error) {
      setProfile(null);
      setError('Unable to restore your session.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin() {
    try {
      setError('');
      setLoading(true);

      const data = await loginUser(username, password);

      await saveToken(data.accessToken);

      const user = await getCurrentUser(data.accessToken);

      setProfile(user);
    } catch (error) {
      setProfile(null);
      setError('Login failed. Check your username and password.');
    } finally {
      setLoading(false);
    }
  }

  async function handleLogout() {
    await deleteToken();

    setProfile(null);
    setError('');
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading...</Text>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginCard}>
          <Text style={styles.title}>Secure Profile</Text>

          <Text style={styles.label}>Username</Text>

          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
            placeholder="Enter username"
          />

          <Text style={styles.label}>Password</Text>

          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholder="Enter password"
          />

          {error ? (
            <Text style={styles.error}>
              {error}
            </Text>
          ) : null}

          <Pressable
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Logging in...' : 'Login'}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

    return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.profileContainer}>
        <Text style={styles.title}>Emily</Text>

        {profile.image ? (
          <Image
            source={{ uri: "https://bst.icons8.com/wp-content/uploads/2024/05/parakeet_female_profile_icon.webp"}}
            style={styles.profileImage}
          />
        ) : null}

        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Name</Text>
          <Text style={styles.infoValue}>
            {profile.firstName} {profile.lastName}
          </Text>

          <Text style={styles.infoLabel}>Username</Text>
          <Text style={styles.infoValue}>
            {profile.username}
          </Text>

          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>
            {profile.email}
          </Text>

          <Text style={styles.infoLabel}>User ID</Text>
          <Text style={styles.infoValue}>
            {profile.id}
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed && styles.buttonPressed,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fee8e8',
    justifyContent: "center"
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },

  loginCard: {
    margin: 20,
    marginTop: 80,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 12,

    shadowColor: '#000',
    shadowOffset: {
    width: 0,
    height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,


    elevation: 4,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 25,
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 18,
    backgroundColor: 'white',
  },

  error: {
    color: 'red',
    marginBottom: 15,
    textAlign: 'center',
  },

  profileContainer: {
    padding: 24,
    alignItems: 'center',
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },

  infoCard: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,


    elevation: 4,    
  },

  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },

  infoValue: {
    fontSize: 18,
    marginTop: 4,
  },

  button: {
    backgroundColor: '#3e8900',
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    width: "100%"
  },

  buttonPressed: {
    opacity: 0.6,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});