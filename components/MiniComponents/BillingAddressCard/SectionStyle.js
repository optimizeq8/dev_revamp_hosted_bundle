import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";

export default (sectionStyle = {
  container: {
    paddingTop: "20%",
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
  searchTextInput: { color: "#FFF", fontFamily: "montserrat-regular" },
  item: {
    backgroundColor: "rgba(0,0,0,0)"
  },
  itemText: {
    color: globalColors.orange,
    fontSize: 20,
    fontFamily: "montserrat-medium"
  },
  selectedItemText: { color: "#fff" },
  subItemText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular"
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