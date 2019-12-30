import { StyleSheet, PixelRatio, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between"
  },

  slidercontainer: {
    paddingHorizontal: 40,
    width: "100%",
    flex: 1
  },
  countryScrollContainer: {
    display: "flex"
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14 / PixelRatio.getFontScale(),
    borderBottomColor: "#0000",
    alignSelf: "center",
    textAlign: "center",
    height: 37
  },
  selectTextContainer: {
    paddingVertical: 20,
    flexDirection: "row"
  },
  optionsTextContainer: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: 14,
    paddingLeft: 20
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#fff"
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.orange
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "column"
    // alignItems: "center"
  }
});
export default styles;
