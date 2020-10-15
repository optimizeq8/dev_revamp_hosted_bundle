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
    borderRadius: 50,
    padding: 10,
  },
  icon: {
    alignSelf: "center",
  },
  menutext: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    fontSize: 13,
    fontFamily: "montserrat-bold",
    color: globalColors.gray,
    textAlign: "left",
    textTransform: "uppercase",
  },
  menudetails: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    color: globalColors.gray,

    fontFamily: "montserrat-regular",
    fontSize: 11,
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
});

export default styles;
