import { StyleSheet, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  searchBarView: {
    width: "100%",
    alignItems: "center",
  },
  searchBarItem: {
    backgroundColor: "#fff",
    borderColor: "#0000",
    paddingHorizontal: RFValue(7.5, 414),
  },
  searchBarInput: {
    fontFamily: "montserrat-light",
    fontSize: RFValue(7.5 / PixelRatio.getFontScale(), 414),
  },
});

export default styles;
