import { StyleSheet, PixelRatio, I18nManager } from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
export const colors = {
  subItemBackground: "transparent",
  itemBackground: "transparent",
  chipColor: "#fff",
  primary: "#FF9D00",
  searchPlaceholderTextColor: "#fff",
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
    backgroundColor: "rgba(0,0,0,0.9)",
    width: "100%",
    height: "105%",
    flex: 0,
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    color: "#fff",
    width: wp(80),
    alignSelf: "center",
  },
  searchTextInput: {
    color: "#FFF",
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  item: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#fff",
  },
  itemText: { color: "#fff" },
  selectedItemText: { color: "#fff" },
  subItemText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-bold",
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
