import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default StyleSheet.create({
  selectToggle: {
    marginBottom: 30,
    borderBottomWidth: 0.5,
    borderColor: "#fff",
    fontFamily: "montserrat-medium"
  },
  selectToggleText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-medium"
  },
  container: {
    // marginTop: hp(5),
    marginVertical: -"100%",
    marginLeft: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    width: wp(100)
  },
  searchBar: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 15,
    color: "#fff",
    width: wp(80),
    alignSelf: "center"
  },
  searchTextInput: { color: "#FFF" },
  item: {
    backgroundColor: "rgba(0,0,0,0)",
    color: "#fff"
  },
  itemText: { color: "#fff" },
  selectedItemText: { color: "#fff" },
  subItemText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-bold"
  },
  scrollView: {
    width: wp(80),
    marginBottom: hp(5),
    alignSelf: "center"
  },
  button: {
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: "center"
  },
  confirmText: { color: "#fff" },
  colors: {
    subItemBackground: "transparent",
    itemBackground: "transparent",
    chipColor: "#fff",
    primary: "#FF9D00",
    searchPlaceholderTextColor: "#fff",
    searchSelectionColor: "#fff"
  }
});
