import { StyleSheet, Platform, I18nManager } from "react-native";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  innerView: {
    marginHorizontal: 30,
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
    paddingBottom: 40,
    height: "100%",
    // marginHorizontal: 30,
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#fff",
    // borderRadius: 50,
    // padding: 10,
  },
  targetTouchableOuter: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 23,
    // padding: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    alignSelf: "center",
  },
  menutext: {
    // paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 25,
    // paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    fontSize: 12,
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
    fontSize: 13,
    lineHeight: 29,
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
    fontSize: 14,
    color: globalColors.purple3,
    flex: 1,
    marginHorizontal: 5,
    textTransform: "uppercase",
    textAlign: "left",
  },
  audienceSubHeading: {
    paddingHorizontal: 30,
  },
  genderOuterView: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
  },
  genderInnerView: {
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    // paddingVertical: 5,
    marginHorizontal: 5,
    borderColor: globalColors.purple3,
  },
  genderRadioText: {
    color: globalColors.purple3,
    fontSize: 13,
    fontFamily: "montserrat-regular",
    lineHeight: 29,
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
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderColor: globalColors.purple3,
    borderRadius: 20,
    // marginHorizontal: 10,
    marginVertical: 5,
  },
  selectLanguageText: {
    fontFamily: "montserrat-regular",
    color: globalColors.purple3,
    fontSize: 13,
  },
  ageText: {
    color: globalColors.purple,
    fontSize: 13,
    fontFamily: "montserrat-regular",
    textAlign: "center",
  },

  toText: {
    marginHorizontal: 15,
    color: globalColors.purple3,
    fontSize: 13,
    fontFamily: "montserrat-regular",
  },

  ageView: {
    borderWidth: 1,
    borderColor: globalColors.purple3,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 6,
    justifyContent: "center",
  },
  ageOuterView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 5,
  },
});

export default styles;
