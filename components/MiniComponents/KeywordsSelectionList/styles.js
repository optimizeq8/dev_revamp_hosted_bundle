import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20
  },
  inactivetext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff"
  },
  optionsTextContainer: {
    textAlign: "center",
    paddingLeft: 10
  },
  optionsContainer: {
    flexDirection: "column",
    width: wp("80%")
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
  searchfield: {
    marginBottom: 10,
    marginTop: 20,
    alignSelf: "center",
    width: 300,
    borderColor: "#0000",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 30,
    paddingHorizontal: 15
  },
  infoText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    width: 250,
    paddingTop: 50,
    alignSelf: "center"
  },
  scrollViewContainer: {
    width: "100%",
    maxHeight: hp("25%")
  },
  selectedContainer: {
    width: "100%",
    height: "40%",
    marginTop: 20,
    padding: 5,
    borderRadius: 10
  },
  selectedScrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
  resetText: {
    alignSelf: "center",
    paddingTop: 20,
    margin: 0
  },
  icon: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10
  },
  selectedItem: {
    overflow: "hidden",
    justifyContent: "center",
    height: 26,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0
  }
});

export default styles;
