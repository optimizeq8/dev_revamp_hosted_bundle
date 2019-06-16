import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000"
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
    paddingTop: heightPercentageToDP("2%"),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  mainCard: {
    top: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",

    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  activeBadege: {
    backgroundColor: "transparent",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#FF9D00",
    borderWidth: 2
  },
  badge: {
    backgroundColor: "transparent",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderColor: "#fff",
    borderWidth: 1
  },
  activeBadegeText: {
    color: "#FF9D00",
    fontSize: 12,
    fontFamily: "montserrat-medium"
  },
  dash: {
    width: 10,
    marginHorizontal: 5,
    borderBottomColor: "#fff",
    borderBottomWidth: 2
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-light"
  }
});

export default styles;
