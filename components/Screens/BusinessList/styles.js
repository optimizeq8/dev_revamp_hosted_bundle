import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  switchAccountText: {
    marginTop: 5,
    marginBottom: 20,
    paddingBottom: 10
  },
  title: {
    fontFamily: "montserrat-medium",
    color: "#C6C6C6",
    fontSize: 16,
    textAlign: "center",
    marginTop: 30
  },
  container: {
    marginTop: 30,
    backgroundColor: "#0000",
    zIndex: 10
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    // flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    paddingTop: 15
  },
  text: {
    textAlign: "center",
    color: "#C6C6C6",

    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  bottomCard: {
    backgroundColor: "#FF9D00",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: hp("14"),
    // top: 10,
    position: "absolute",
    top: "84%",
    width: "100%",
    justifyContent: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  subtext: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingBottom: 20,
    alignSelf: "center",
    color: "#fff"
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: hp("30"),
    paddingHorizontal: "10%"
  },
  headings: {
    fontFamily: "montserrat-bold",
    marginVertical: 10,
    fontSize: 14,
    color: "#575757",
    textAlign: "left"
  }
});

export default styles;
