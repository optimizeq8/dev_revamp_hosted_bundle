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
  scrollViewContainer: {
    width: "100%",
    // flex: 1,
    maxHeight: hp("25%")
  },
  safeAreaContainer: {
    height: "100%",
    width: "100%"
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    paddingTop: 30
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-bold",
    paddingTop: 20,
    alignSelf: "center"
  },
  subTitle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    // width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginBottom: 40
  },
  icon: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  inactivetext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff"
    // paddingLeft: 10
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.orange
  },
  optionsContainer: {
    flexDirection: "column",
    // paddingTop: 20,
    width: wp("80%")
    // flex: 1
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20
  },
  optionsIconSize: {
    fontSize: 25
  },
  optionsTextContainer: {
    textAlign: "center",
    paddingLeft: 10
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14 / PixelRatio.getFontScale(),
    borderBottomColor: "#0000",
    alignSelf: "center",
    textAlign: "center",
    height: 37
  }
});

export default styles;
