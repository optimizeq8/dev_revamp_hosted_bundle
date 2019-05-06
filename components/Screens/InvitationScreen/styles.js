import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  title: {
    top: -15,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    paddingTop: 0,
    textAlign: "center",
    fontFamily: "montserrat-medium"
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
    marginTop: heightPercentageToDP(10),
    backgroundColor: "#751AFF",
    flex: 1
  },
  content: {
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
  registered: { position: "absolute", bottom: 60, alignSelf: "center" },
  registeredText: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textAlign: "center"
  },
  bottomView: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 13,
    width: 200,
    height: 40,
    justifyContent: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
