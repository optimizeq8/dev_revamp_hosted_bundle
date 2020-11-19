import { StyleSheet, PixelRatio, I18nManager } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
    marginBottom: 30,
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    fontFamily: "montserrat-medium",
  },
  selectToggleText: {
    color: "#fff",
    fontSize: 14,
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
    borderRadius: 15,
    color: globalColors.rum,
    width: wp(80),
    alignSelf: "center",
  },
  searchTextInput: {
    color: globalColors.rum,
    fontSize: 17 / PixelRatio.getFontScale(),
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  item: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#000",
  },
  itemText: { color: globalColors.rum, fontFamily: "montserrat-semibold" },
  selectedItemText: { color: globalColors.rum },
  subItemText: {
    color: globalColors.rum,
    fontSize: 14,
    fontFamily: "montserrat-regular",
  },
  scrollView: {
    width: wp(80),
    // marginBottom: hp(5),
    alignSelf: "center",
  },
  button: {
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: "center",
  },
  confirmText: { color: "#fff" },
});
