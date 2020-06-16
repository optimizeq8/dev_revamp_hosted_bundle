import { StyleSheet } from "react-native";
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
    paddingHorizontal: 23,
    alignItems: "center",
    marginVertical: 20,
  },

  MediaOptionsTitle: {
    fontFamily: "montserrat-bold",
    color: globalColors.orange,
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left",
  },
  MediaOptionsDescription: {
    fontFamily: "montserrat-light",
    color: "#fff",
    fontSize: 13,
    lineHeight: 17,
    textAlign: "left",
  },
});
