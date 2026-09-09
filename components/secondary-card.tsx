import { View , StyleSheet} from "react-native";
import { ReactNode } from "react";

type SubHead = {
  children: ReactNode;
};

export default function SecondaryCard({children}: SubHead) {
  return (
    <View style={styles.container}>
     {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7D6D0",
    padding: 15,
    borderRadius: 15,

    shadowOffset: {
      width: 3,
      height:4
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginBottom: 10,
  },


});
