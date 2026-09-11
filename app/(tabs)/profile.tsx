import { View, StyleSheet, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemedText } from '@/components/themed-text';
import Container from '@/components/container-box';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profile}>
            <Image
              source={require("@/assets/images/react-logo.png")}
              style={styles.image}
            />
            <ThemedText darkColor='black' type='title'>{user?.name}</ThemedText>
            <ThemedText darkColor='gray' type='subtitle'>{user?.email}</ThemedText>
          </View>

          <Container color='white'>
            <View style={styles.customCards}>
            <View style={{alignItems:'center'}}>
                <ThemedText darkColor='black' type='defaultSemiBold'>12</ThemedText>
                <ThemedText darkColor='gray' type='subtitle'>Projects</ThemedText>
              </View>
              <View style={{alignItems:'center'}}>
                <ThemedText darkColor='black' type='defaultSemiBold'>12</ThemedText>
                <ThemedText darkColor='gray' type='subtitle'>Projects</ThemedText>
              </View>
              <View style={{alignItems:'center'}}>
                <ThemedText darkColor='black' type='defaultSemiBold'>12</ThemedText>
                <ThemedText darkColor='gray' type='subtitle'>Projects</ThemedText>
              </View>
            </View>
          </Container>
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
  customCards: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 5,
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "white",
    borderRadius: "50%"
  },
  profile: {
    alignItems: "center",
    gap: 10,
    marginBottom: "10%"
  },
});
