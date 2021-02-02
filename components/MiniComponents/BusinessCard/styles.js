import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  subtext: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    color: "#fff",
  },
  businessButton: {
    flexDirection: "row",
    paddingVertical: RFValue(7.5, 414),
    bottom: RFValue(7.5, 414),
    alignItems: "center",
  },
  businessIconStyle: {
    width: RFValue(25, 414),
    height: RFValue(25, 414),
    borderRadius: RFValue(25, 414),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#c6c6c6",
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: RFValue(3.5, 414),
  },
  titletext: {
    textAlign: "left",
    paddingTop: RFValue(2.5, 414),
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9, 414),
    paddingVertical: 0,
    textTransform: "uppercase",
    color: globalColors.rum,
  },
});

export default styles;
