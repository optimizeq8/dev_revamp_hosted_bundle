import { StyleSheet, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    // backgroundColor: "#FFF"
    backgroundColor: globalColors.bluegem,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 13,
    textAlign: "center",
    fontFamily: "montserrat-medium",
  },
  container: {
    flex: 1,
    backgroundColor: "#0000",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  mainCard: {
    paddingTop: 0,
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
  },
  activeBadege: {
    // backgroundColor: "#6C63FF",
    backgroundColor: globalColors.bluegem,
    width: 40,
    height: 40,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",

    alignSelf: "center",
    paddingVertical: 0,
  },
  badge: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
    width: 30,
    height: 30,
    borderRadius: 35,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    paddingVertical: 0,
  },
  activeBadegeText: {
    marginTop: I18nManager.isRTL ? 10 : 0,
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#FFF",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
  },
  dash: {
    alignSelf: "center",
    width: RFValue(15, 414),

    marginBottom: RFValue(5, 414),
    // marginHorizontal: 5,
    borderBottomColor: "#C6C6C6",
    borderBottomWidth: 2,
  },
  dashActive: {
    marginLeft: RFValue(-2.5, 414),
  },
  badgeText: {
    color: "#C6C6C6",
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-light",
  },
  activeTitleText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    // color: "#6C63FF",
    color: globalColors.bluegem,
    textTransform: "uppercase",
  },
  titleText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(4, 414),
    color: "#C6C6C6",
    paddingTop: RFValue(1.5, 414),
  },
  badgeView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressCardView: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: RFValue(15, 414),
    borderBottomLeftRadius: RFValue(15, 414),
    borderBottomRightRadius: RFValue(15, 414),
  },
  getStartedBtn: {
    height: 54,
    width: 220,
    alignSelf: "center",
  },
  registerSuccessIcon: {
    marginLeft: I18nManager.isRTL
      ? widthPercentageToDP(-5)
      : widthPercentageToDP(-55),
    marginTop: heightPercentageToDP(5),
  },
  successText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    color: "#FFF",
    textAlign: "left",
  },
  registerCompleteText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(13.5, 414),
    color: "#FFF",
    textAlign: "left",
    paddingTop: 10,
  },
  mainView: {
    display: "flex",
    paddingHorizontal: 30,
    paddingTop: 10,
    flexDirection: "column",
  },
  getStartedText: {
    fontSize: RFValue(7, 414),
  },
  registerationText: {
    fontSize: RFValue(7, 414),
    // color: "#6C63FF",
    color: globalColors.bluegem,
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    letterSpacing: 0,
    lineHeight: 18,
    marginLeft: 5,
  },
  registerHeaderIconView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    // alignSelf: "flex-start"
    // flex: 1
  },
});

export default styles;
