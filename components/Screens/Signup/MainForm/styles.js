import { StyleSheet, I18nManager } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1
    // backgroundColor: "#FFF"
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 13,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  container: {
    flex: 1,
    backgroundColor: "#0000"
  },
  content: {
    // paddingTop: heightPercentageToDP("2%"),
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignItems: "center",
    justifyContent: "center"
    // flex: 1
  },
  mainCard: {
    // top: 15,
    // borderTopStartRadius: 30,
    // borderTopEndRadius: 30,
    // backgroundColor: "#fff",
    // borderColor: "transparent",

    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  activeBadege: {
    backgroundColor: "#6C63FF",
    width: 40,
    height: 40,
    borderRadius: 35,
    // borderColor: "#6C63FF",
    // borderWidth: 2,
    alignSelf: "center",
    paddingVertical: 0
  },
  badge: {
    alignSelf: "center",
    backgroundColor: "transparent",
    width: 30,
    height: 30,
    borderRadius: 35,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    paddingVertical: 0
  },
  activeBadegeText: {
    marginTop: I18nManager.isRTL ? 10 : 0,
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#FFF",
    fontSize: 14,
    fontFamily: "montserrat-bold"
  },
  dash: {
    alignSelf: "center",
    width: 30,

    marginBottom: 10,
    // marginHorizontal: 5,
    borderBottomColor: "#C6C6C6",
    borderBottomWidth: 2
  },
  dashActive: {
    marginLeft: -5
  },
  badgeText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-light"
  },
  activeTitleText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#6C63FF"
  },
  titleText: {
    fontFamily: "montserrat-regular",
    fontSize: 8,
    color: "#C6C6C6",
    paddingTop: 3
  },
  badgeView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  progressCardView: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFF",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "space-around",
    paddingVertical: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  }
});

export default styles;
