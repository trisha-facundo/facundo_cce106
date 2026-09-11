import { View,ScrollView ,StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import { Link } from 'expo-router';

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <ThemedText darkColor='black' type='title'>Settings</ThemedText>
          <Link href="/sign-in" style={styles.link}>Log out</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
    padding:20,
  },
  link: {
    color:"#950606"
  }
});
