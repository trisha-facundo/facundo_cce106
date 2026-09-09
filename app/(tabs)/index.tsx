import { StyleSheet, Text, Image, View, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

import Header from "../../components/header-card";
import SecondaryCard from "../../components/secondary-card";
import MetricCards from "../../components/metric-cards";
import ProfileSection from "../../components/profile-section";

export default function HomeScreen() {
  return (
    <SafeAreaView>
    <ScrollView>
        <View style={styles.background}>
        <ProfileSection name="Trisha"/>
        <Text style={ styles.text}>Dashboard</Text>
        <Header title="$500,000.00" description="Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..." />
        <View>
          <SecondaryCard>
            <Text style={styles.subhead}>Spending Breakdown</Text>
            <View style={styles.breakdown}>
              <View>
                <Image
                  source={require("../../assets/images/piechart.png")}
                  style={styles.piechart}
                />
                <Text style={styles.comment}>This is image</Text>
              </View>

              <View style={{justifyContent:"center"}}>
                <Text style={ styles.list}>1. Allowance 500</Text>
                <Text style={ styles.list}>2. Grocery 2000</Text>
                <Text style={ styles.list}>3. Electricity 1700</Text>
              </View>
            </View>
          </SecondaryCard>
        </View>
        <View>
          <SecondaryCard>
            <Text style={styles.subhead}>Income vs Expenses</Text>
            <Text style={styles.content}>Lorem Ipsum has been the industrys standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letrasets Body Type sheets.</Text>
          </SecondaryCard>
        </View>
        <View>
          <SecondaryCard>
            <Text style={styles.subhead}>Recent Transactions</Text>
            <Text style={styles.content}>Lorem Ipsum has been the industrys standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letrasets Body Type sheets.</Text>
          </SecondaryCard>
        </View>
        <View>
          <SecondaryCard>
            <Text style={styles.subhead}>Quick Actions</Text>
            <View style={ styles.metrics}>
              <MetricCards></MetricCards>
              <MetricCards></MetricCards>
              <MetricCards></MetricCards>
            </View>
          </SecondaryCard>
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
 );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    padding: 10
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "800",
    color: "#2C2C2C"
  },
  subhead: {
    fontFamily: "Poppins",
    fontSize: 14,
    fontWeight: "500",
    flexDirection: "row",
    alignItems: "flex-start",
  },
  piechart: {
    height: 160,
    width:160
  },
  list: {
    fontFamily: "Poppins",
    fontSize: 12,
    marginBottom: 5
  },
  breakdown: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  comment: {
    textAlign: "center",
    fontFamily: "Poppins",
    color: "gray",
    fontSize: 11
  },
  content: {
    fontFamily: "Poppins",
    fontSize: 12,
    textAlign: "justify",
    margin: 5,
    fontWeight: "100",
  },
  metrics: {
    marginTop:10,
    flexDirection: "row",
    justifyContent:"space-between"
  },
});
