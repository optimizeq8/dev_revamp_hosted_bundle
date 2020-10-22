import { StyleSheet, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
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
    backgroundColor: "#6C63FF",
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
    fontSize: 14,
    fontFamily: "montserrat-bold",
  },
  dash: {
    alignSelf: "center",
    width: 30,

    marginBottom: 10,
    // marginHorizontal: 5,
    borderBottomColor: "#C6C6C6",
    borderBottomWidth: 2,
  },
  dashActive: {
    marginLeft: -5,
  },
  badgeText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-light",
  },
  activeTitleText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#6C63FF",
    textTransform: "uppercase",
  },
  titleText: {
    fontFamily: "montserrat-regular",
    fontSize: 8,
    color: "#C6C6C6",
    paddingTop: 3,
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
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
    fontSize: 14,
    color: "#FFF",
    textAlign: "left",
  },
  registerCompleteText: {
    fontFamily: "montserrat-bold",
    fontSize: 27,
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
    fontSize: 14,
  },
  registerationText: {
    fontSize: 14,
    color: "#6C63FF",
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
