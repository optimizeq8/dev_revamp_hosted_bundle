import { StyleSheet, I18nManager, Dimensions } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import globalStyles, { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  inputProps: {
    backgroundColor: "rgba(0,0,0,0)"
  },
  cellProps: {
    backgroundColor: "rgba(0,0,0,0.06)",
    borderRadius: 14,
    color: globalColors.orange,
    fontFamily: "montserrat-bold",
    // padding: 10,
    borderColor: "rgba(0,0,0,0)",
    width: 35,
    height: 37
  },
  headingText: {
    textAlign: "center",
    color: globalColors.white,
    fontSize: 14,
    fontFamily: "montserrat-regular",
    width: "80%",
    alignSelf: "center",
    marginBottom: 24
  },
  mobileDetailCard: {
    backgroundColor: globalColors.white,
    paddingLeft: 20,
    paddingRight: 10,
    paddingVertical: 20,
    marginHorizontal: 20,
    borderRadius: 35
  },
  rowView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  verifyButton: {
    width: widthPercentageToDP(30),
    height: 40,
    alignSelf: "center"
  },
  bottomText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textDecorationLine: "underline",
    color: globalColors.orange,
    paddingTop: 20
  },
  heading: {
    color: "#575757",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    textAlign: "left"
  },
  detailInput: {
    color: "#909090",
    fontSize: 14,
    fontFamily: "montserrat-regular-english",
    textAlign: I18nManager.isRTL ? "right" : "left"
  },
  detailInputText: {
    color: "#909090",
    fontSize: 14,
    fontFamily: "montserrat-regular-english",
    textAlign: "left"
  },
  codeSentText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#909090",
    textAlign: "center"
  },
  detail: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: globalColors.orange,
    textAlign: "center"
  }
});

export default styles;
