import {Text,View,StyleSheet } from "react-native";
export default function MetricCards() {
  return (
    <View style={styles.card}>
      <Text style={ styles.text}>Lorem</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#B1E5E6",
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
    margin: 5,

    shadowOffset: {
      width: 3,
      height:4
    },
    shadowOpacity: 0.15,
    shadowRadius:5
  },
  text: {
    fontSize:14,
    fontFamily: "Poppins",
  }
});
