import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  innerView: {
    marginHorizontal: RFValue(15, 414),
    height: "100%",
    flex: 1,
    backgroundColor: "#0000",
  },
  maskedView: { height: "100%" },
  versionIcon: {
    color: globalColors.purple,
    right: 2,
  },
  targetList: {
    flexDirection: "column",
    paddingBottom: RFValue(20, 414),
    height: "100%",
    // marginHorizontal: RFValue(15, 414),
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: RFValue(4, 414),
    backgroundColor: "#fff",
    // borderRadius: 50,
    // padding: RFValue(5, 414),
  },
  targetTouchableOuter: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: RFValue(4, 414),
    backgroundColor: "#fff",
    borderRadius: 23,
    // padding: RFValue(5, 414),
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(2.5, 414),
  },
  icon: {
    alignSelf: "center",
  },
  menutext: {
    // paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 25,
    // paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-semibold",
    color: globalColors.purple3,
    textAlign: "left",
    textTransform: "uppercase",
  },
  menudetails: {
    // paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 25,
    // paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    color: globalColors.purple3,

    fontFamily: "montserrat-regular",
    fontSize: RFValue(6.5, 414),
    lineHeight: RFValue(14.5, 414),
    textAlign: "left",
  },
  flex: {
    flex: 1,
  },
  loader: {
    backgroundColor: "#0004",
    width: "100%",
    height: "100%",
    position: "absolute",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  audienceHeading: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    color: globalColors.purple3,
    flex: 1,
    marginHorizontal: RFValue(2.5, 414),
    textTransform: "uppercase",
    textAlign: "left",
  },
  audienceSubHeading: {
    paddingHorizontal: RFValue(15, 414),
  },
  genderOuterView: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: RFValue(4, 414),
  },
  genderInnerView: {
    borderWidth: 1,
    borderRadius: RFValue(10, 414),
    paddingHorizontal: RFValue(5, 414),
    // paddingVertical: RFValue(2.5, 414),
    marginHorizontal: RFValue(2.5, 414),
    borderColor: globalColors.purple3,
  },
  genderRadioText: {
    color: globalColors.purple3,
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-regular",
    lineHeight: RFValue(14.5, 414),
  },
  genderInnerActiveView: {
    borderColor: globalColors.purple,
    backgroundColor: globalColors.purpleTran,
  },
  genderRadioTextActive: {
    color: globalColors.purple,
  },
  selectLanguageButton: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(1.5, 414),
    borderColor: globalColors.purple3,
    borderRadius: RFValue(10, 414),
    // marginHorizontal: RFValue(5, 414),
    marginVertical: RFValue(2.5, 414),
  },
  selectLanguageText: {
    fontFamily: "montserrat-regular",
    color: globalColors.purple3,
    fontSize: RFValue(6.5, 414),
  },
  ageText: {
    color: globalColors.purple,
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-regular",
    textAlign: "center",
  },

  toText: {
    marginHorizontal: RFValue(7.5, 414),
    color: globalColors.purple3,
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-regular",
  },

  ageView: {
    borderWidth: 1,
    borderColor: globalColors.purple3,
    borderRadius: RFValue(10, 414),
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: RFValue(3, 414),
    justifyContent: "center",
  },
  ageOuterView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: RFValue(2.5, 414),
  },
  iconDown: {
    color: globalColors.purple,
    right: 2,
    fontSize: RFValue(11, 414),
  },
});

export default styles;
