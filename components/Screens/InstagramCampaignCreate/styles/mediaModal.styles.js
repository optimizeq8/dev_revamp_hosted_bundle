import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%",
  },
  popupOverlay: {
    height: "100%",
  },
  MediaOptionsStyle: {
    flexDirection: "row",
    paddingHorizontal: RFValue(11.5, 414),
    alignItems: "center",
    marginVertical: RFValue(10, 414),
  },

  MediaOptionsTitle: {
    fontFamily: "montserrat-bold",
    color: globalColors.orange,
    fontSize: RFValue(8, 414),
    lineHeight: RFValue(10, 414),
    textAlign: "left",
  },
  MediaOptionsDescription: {
    fontFamily: "montserrat-light",
    color: "#fff",
    fontSize: RFValue(6.5, 414),
    lineHeight: RFValue(8.5, 414),
    textAlign: "left",
  },
});
