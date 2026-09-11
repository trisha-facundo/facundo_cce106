import { View ,StyleSheet, ScrollView} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemedText } from "@/components/themed-text";

import Container from "@/components/container-box";

export default function HomeScreen() {
  return (
    <SafeAreaView  style={styles.container}>
      <ScrollView>
        <View>
          <View style={{marginBottom: "5%"}}>
            <ThemedText darkColor="gray" type="subtitle"style={{marginBottom: "3%"}}>Good morning</ThemedText>
            <ThemedText darkColor="black" type="title">Trisha</ThemedText>
          </View>

          <View style={{marginBottom: "5%"}}>
            <Container color="#1B5E20">
              <ThemedText darkColor="#A5D6A7" type="link">Todays Focus</ThemedText>
              <ThemedText lightColor="white" type="default">3 tasks need your attention</ThemedText>
            </Container>
          </View>

          <View>
            <ThemedText darkColor="gray" type="subtitle" style={{marginBottom: "5%"}}>Recent Activity</ThemedText>
            <Container color="white">
              <ThemedText darkColor="black" type="default" >Finish Onboarding</ThemedText>
              <ThemedText darkColor="gray" type="link">2 steps left</ThemedText>
            </Container>
          </View>

          <View>
            <Container color="white">
              <ThemedText darkColor="black" type="default" >Weekly summary</ThemedText>
              <ThemedText darkColor="gray" type="link">Ready to view</ThemedText>
            </Container>
          </View>

          <View>
            <Container color="white">
              <ThemedText darkColor="black" type="default" >New Message</ThemedText>
              <ThemedText darkColor="gray" type="link">From support team</ThemedText>
            </Container>
          </View>
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

});
