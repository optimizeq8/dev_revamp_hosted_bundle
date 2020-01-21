import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export const globalColors = {
  orange: "#FF790A",
  darkOrange: "#FF790A",
  purple: "#751AFF",
  green: "#66D072",
  yellow: "#FFFC00",
  white: "#FFFFFF",
  red: "#EA514B",
  black: "#000000",
  transparent: "#0000"
};
const globalStyles = StyleSheet.create({
  linearGradientBackground1: {
    backgroundColor: "#751AFF"
  },
  linearGradientBackground2: {
    backgroundColor: "#6268FF"
  },
  orangeTextColor: {
    color: "#FF9D00"
  },
  orangeBorderColor: {
    borderColor: "#FF9D00"
  },
  orangeBackgroundColor: {
    backgroundColor: "#FF9D00"
  },
  whiteTextColor: {
    color: "#FFFFFF"
  },
  whiteBackgroundColor: {
    backgroundColor: "#FFFFFF"
  },
  whiteBorderColor: {
    borderColor: "#FFFFFF"
  },
  blackTextColor: {
    color: "#000"
  },
  blackBackgroundColor: {
    backgroundColor: "#000"
  },
  purpleTextColor: {
    color: "#751AFF"
  },
  purpleBackgroundColor: {
    backgroundColor: "#751AFF"
  },
  transparentBackgroundColor: {
    backgroundColor: "#0000"
  },
  transparentTextColor: {
    color: "#0000"
  },
  darkGrayBackgroundColor: {
    backgroundColor: "#717171"
  },
  darkGrayTextColor: {
    color: "#717171"
  },
  grayTextColor: {
    color: "#a0a0a0"
  },
  grayBackgroundColor: {
    backgroundColor: "#A0A0A0"
  },
  grayBorderColor: {
    borderColor: "#A0A0A0"
  },
  redTextColor: {
    color: "red"
  },
  redBorderColor: {
    borderColor: "red"
  },
  transparentBorderColor: {
    borderColor: "#0000"
  },
  lightGrayTextColor: {
    color: "#C6C6C6"
  },
  lightGrayBorderColor: {
    borderColor: "#D9D9D9"
  },
  purpleBorderColor: {
    borderColor: "#7039FF"
  },
  container: {
    marginTop: 30,
    backgroundColor: "transparent"
  },
  row: {
    flexDirection: "row"
  },
  column: {
    flexDirection: "column"
  },
  title: {
    fontSize: 20 / PixelRatio.getFontScale(),
    color: "#fff",
    paddingVertical: 10,
    fontFamily: "montserrat-bold"
  },
  buttonText: {
    fontSize: 16 / PixelRatio.getFontScale(),
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-bold"
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    fontSize: 16 / PixelRatio.getFontScale(),
    paddingHorizontal: 10
  },
  backButton: {
    top: hp(5),
    left: wp(8),
    width: 30,
    height: 30,
    zIndex: 10,
    elevation: 2,
    alignItems: "center",
    justifyContent: "center"
  },
  backDrop: {
    position: "absolute",
    top: -hp(45),
    alignSelf: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  background: {
    position: "absolute",
    opacity: 0.4,
    top: "25%",
    alignSelf: "center"
  }
});
export default globalStyles;
