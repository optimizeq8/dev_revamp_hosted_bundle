import { StyleSheet, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  copyText: {
    fontSize: RFValue(8, 414),
    color: globalColors.white,
    textAlign: "center",
    fontFamily: "montserrat-regular",
    marginHorizontal: RFValue(15, 414),
    paddingVertical: RFValue(10, 414),
  },
  pixelView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.16)",
    paddingHorizontal: RFValue(15, 414),
    paddingVertical: RFValue(7.5, 414),
    borderRadius: RFValue(15, 414),
    marginHorizontal: RFValue(5, 414),
  },
  pixelCode: {
    color: "#FFFFFF",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
  },
  copyIcon: {
    alignSelf: "flex-end",
    left: RFValue(4, 414),
  },
});
export default styles;
