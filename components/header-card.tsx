import { Text, View,StyleSheet } from "react-native";
import MetricCards from "../components/metric-cards";

type HeaderProps = {
  title: string;
  description: string;
};

export default function Header(props:HeaderProps) {
  return (
    <View style={styles.container}>
      <Text style={ styles.balance}>Balance</Text>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.description}>{props.description}</Text>
      <View style={ styles.metrics}>
        <MetricCards></MetricCards>
        <MetricCards></MetricCards>
        <MetricCards></MetricCards>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4A4A4A",
    borderRadius: 15,
    padding: 15,
    shadowColor: "black",

    shadowOffset: {
      width: 3,
      height:4
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginBottom: 10
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    fontFamily: "Poppins",
    color: "#CCFBFA"
  },
  description: {
    fontSize: 12,
    fontFamily: "Poppins",
    fontWeight: "300",
    marginTop: 5,
    fontStyle: "italic",
    color: "#FFF5F5"
  },
  metrics: {
    marginTop:10,
    flexDirection: "row",
    justifyContent:"space-between"
  },
  balance: {
    color: "#FFF5F590",
    fontFamily: "Poppins",
    fontSize: 8,
    marginBottom:5
  }
});
