import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  button: {
    marginHorizontal: 8,
    overflow: "hidden",
  },
  gradient: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-bold",
    color: "#FFF",
  },
});

export default styles;
