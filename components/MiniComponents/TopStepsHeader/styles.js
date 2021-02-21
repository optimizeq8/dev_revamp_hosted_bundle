import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#0000",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 70,
    paddingHorizontal: 15,
  },
  activeBadege: {
    backgroundColor: "#9300FF",
    width: 35,
    height: 35,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    bottom: 2,
  },
  badge: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    width: 25,
    height: 25,
    borderRadius: 35,
    borderColor: "#C6C6C6",
    borderWidth: 1,
    paddingVertical: 0,
  },
  activeBadegeText: {
    alignSelf: "center",
    textAlignVertical: "center",
    color: "#FFF",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
  },
  dash: {
    alignSelf: "center",
    width: 15,
    marginBottom: 10,
    marginRight: -10,
    marginLeft: -9,
    borderBottomColor: "#C6C6C6",
    borderBottomWidth: 2,
  },
  dashActive: {
    marginLeft: -5,
  },
  badgeText: {
    color: "#C6C6C6",
    fontSize: RFValue(4.5, 414),
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  activeTitleText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    color: "#9300FF",
    textAlign: "center",
    height: "120%",
    width: "110%",
  },
  titleText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(4, 414),
    color: "#C6C6C6",
    paddingTop: 3,
  },
  badgeView: {
    alignItems: "center",
    marginHorizontal: -2,
    width: 55,
    height: 40,
  },
  progressCardView: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: RFValue(10, 414),
    borderBottomLeftRadius: RFValue(15, 414),
    borderBottomRightRadius: RFValue(15, 414),
  },
  title: {
    fontSize: RFValue(7, 414),
    color: "#9300FF",
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    letterSpacing: 0,
    lineHeight: 20,
    width: widthPercentageToDP(30),
    flexShrink: 1,
    textAlign: "center",
  },
  english: {
    fontFamily: "montserrat-bold-english",
  },
  left: {
    width: "10%",
    padding: 10,
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  registerHeaderIconView: {
    display: "flex",
    alignItems: "center",
    // flexDirection: "row",
    // alignSelf: "flex-start"
    // flex: 1
  },
});

export default styles;
