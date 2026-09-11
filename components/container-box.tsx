import { View,StyleSheet } from "react-native";
import { ReactNode } from "react";
type container = {
  children: ReactNode;
  color?: string;
}

export default function Container({children,color}:container) {
  return (
    <View style={[styles.box, {backgroundColor: color}]}>
      {children}
    </View>
  );
}
const styles = StyleSheet.create({
  box: {
    width: "100%",
    padding: 15,
    borderRadius: 15,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.09,
    shadowRadius: 6,
    marginBottom:15
  }
});
