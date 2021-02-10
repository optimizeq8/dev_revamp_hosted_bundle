import { StyleSheet, PixelRatio, I18nManager } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  subItemBackground: "transparent",
  itemBackground: "transparent",
  chipColor: "#fff",
  primary: "#FF9D00",
  searchPlaceholderTextColor: globalColors.rum,
  searchSelectionColor: "#fff",
};
export default styles = StyleSheet.create({
  selectToggle: {
    marginBottom: RFValue(15, 414),
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    fontFamily: "montserrat-medium",
  },
  selectToggleText: {
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-medium",
  },
  container: {
    marginVertical: 0,
    marginLeft: 0,
    // backgroundColor: "rgba(0,0,0,0.9)",
    backgroundColor: "#FFF",
    width: "100%",
    height: "105%",
    flex: 0,
  },
  searchBar: {
    backgroundColor: "#F4F4F4",
    borderColor: globalColors.rum,
    borderRadius: RFValue(7.5, 414),
    color: globalColors.rum,
    width: wp(80),
    alignSelf: "center",
  },
  searchTextInput: {
    color: globalColors.rum,
    fontSize: RFValue(8.5 / PixelRatio.getFontScale(), 414),
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  item: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#000",
  },
  itemText: {
    color: globalColors.rum,
    fontFamily: "montserrat-semibold",
    textAlign: "left",
    fontSize: RFValue(8, 414),
  },
  selectedItemText: { color: globalColors.rum },
  subItemText: {
    color: globalColors.rum,
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-regular",
    textAlign: "left",
  },
  scrollView: {
    width: wp(80),
    // marginBottom: hp(5),
    alignSelf: "center",
  },
  button: {
    borderRadius: RFValue(25, 414),
    width: RFValue(25, 414),
    height: RFValue(25, 414),
    alignSelf: "center",
  },
  confirmText: { color: "#fff" },
  chipText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6.5, 414),
  },
});
