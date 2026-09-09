import { Text, View, StyleSheet} from "react-native";

type ProfileName = {
  name: string;
}

export default function ProfileSection(props:ProfileName) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Welcome Back, {props.name}!</Text>
      </View>

      <View style={styles.profileContainer}>
        <Text style={styles.profile}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 10
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: "bold",
  },
  profileContainer: {
    backgroundColor: "#B1E5E6",
    padding: 5,
    borderRadius:10
  },
  profile: {
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "300",
  },
});
