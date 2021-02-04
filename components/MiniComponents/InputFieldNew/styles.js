import { StyleSheet, PixelRatio, I18nManager, Platform } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
export default StyleSheet.create({
  input1: {
    backgroundColor: "rgba(0,0,0,0.16)",
    paddingRight: RFValue(7.5, 414),
    borderRadius: RFValue(75, 414),
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: "100%",
    borderWidth: 0,
    // height: 54,
    // height: Platform.OS === "android" ? 60 : 54,

    // paddingHorizontal: 18,
    display: "flex",
    alignItems: "center",
    marginVertical: RFValue(7.5, 414),
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    color: "#fff",
    alignSelf: "flex-start",
    textAlign: I18nManager.isRTL ? "right" : "left",
    // marginBottom: -20,
    textTransform: "uppercase",
    marginTop: RFValue(2.5, 414),
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: globalColors.white,
    marginBottom: 0,
    width: "75%",
    paddingLeft: 0,
    paddingRight: 0,
  },
  downicon: {
    fontSize: 20,
    color: "#fff",
    marginLeft: -20,
  },
  downiconEnd: {
    fontSize: RFValue(10, 414),
    color: "#fff",
    marginLeft: RFValue(-40, 414),
  },
  modalBar: {
    flexDirection: "row",
  },
  networkLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    top: 2,
    textTransform: "uppercase",
  },
  networkStringButton: {
    width: 85,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0,
  },
  colView: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    marginLeft: 13,
    width: "100%",
    height:
      Platform.OS === "ios"
        ? RFValue(27, 414)
        : I18nManager.isRTL
        ? RFValue(35, 414)
        : RFValue(30, 414),
  },
  rowView: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
  },
  iconSize: {
    fontSize: RFValue(8 / PixelRatio.getFontScale(), 414),
  },
  icon: {
    marginLeft: RFValue(7.5, 414),
  },
  inputScrollViewStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    // height: "100%",
  },
  uploadText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    color: "#75647C",
    marginHorizontal: RFValue(2.5, 414),
    textTransform: "uppercase",
  },
});
