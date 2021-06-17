import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  menuContainer: {
    backgroundColor: globalColors.white,
    width: "100%",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: RFValue(10, 414),
    borderTopRightRadius: RFValue(10, 414),
    maxHeight: RFValue(125, 414),
    height: "25%",
    borderColor: globalColors.rum,
    borderWidth: 0.5,
    padding: RFValue(5, 414),
  },
  menuHeaderText: {
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    textTransform: "uppercase",
    textAlign: "left",
  },
});
