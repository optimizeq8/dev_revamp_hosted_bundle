import { StyleSheet, I18nManager, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import globalStyles, { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  cardBottomView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  timerText: {
    textAlign: "center",
    color: globalColors.rum,
    fontSize: 14,
    fontFamily: "montserrat-regular",
    alignSelf: "center",
    marginVertical: RFValue(2.5, 414),
    // marginBottom: 24,
  },
  headingText: {
    textAlign: "center",
    color: globalColors.white,
    fontSize: 14,
    fontFamily: "montserrat-regular",
    width: "80%",
    alignSelf: "center",
    marginBottom: 24,
  },
  mobileDetailCard: {
    backgroundColor: globalColors.white,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 35,
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 60,
  },
  verifyButton: {
    width: widthPercentageToDP(30),
    height: 40,
    alignSelf: "center",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textDecorationLine: "underline",
    color: globalColors.orange,
    paddingTop: 20,
  },
  heading: {
    color: "#575757",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    textAlign: "left",
  },
  detailInput: {
    color: "#909090",
    fontSize: 14,
    // height: 60,
    fontFamily: "montserrat-regular-english",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  detailInputText: {
    color: "#909090",
    fontSize: 14,
    fontFamily: "montserrat-regular-english",
    textAlign: "left",
  },
  codeSentText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#909090",
    textAlign: "center",
  },
  detail: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: globalColors.orange,
    textAlign: "center",
  },
});

export const codeFieldStyle = StyleSheet.create({
  cell: {
    width: 40,
    height: 40,
    lineHeight: 30,
    fontSize: 20,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
    borderRadius: 15,
    color: globalColors.orange,
  },
  codeFieldRoot: {
    paddingHorizontal: 40,
  },
  focusCell: {
    borderColor: globalColors.orange,
  },
});
export default styles;
