import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export const globalColors = {
  orange: "#FF9D00",
  purple: "#751AFF",
  white: "#FFFFFF",
  black: "#000000",
  transparent: "#0000"
};
const styles = StyleSheet.create({
  orangeTextColor: {
    color: "#FF9D00"
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
  grayTextColor: {
    color: "#a0a0a0"
  },
  grayBackgroundColor: {
    backgroundColor: "#a0a0a0"
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
  container: {
    marginTop: 30,
    backgroundColor: "transparent"
  },
  title: {
    fontSize: 24 / PixelRatio.getFontScale(),
    color: "#fff",
    textAlign: "center",
    paddingTop: 10,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-bold",
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
  }
});
export default styles;
