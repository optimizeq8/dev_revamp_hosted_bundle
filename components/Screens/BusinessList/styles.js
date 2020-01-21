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
    backgroundColor: "#0000",
    zIndex: 10
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "transparent"
  },
  text: {
    textAlign: "center",
    color: "#C6C6C6",

    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  bottomCard: {
    borderRadius: 50,
    height: hp(9),
    width: hp(9),
    position: "absolute",
    right: "5%",
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
  },
  customInputStyle: {
    backgroundColor: "#0001",
    height: "100%",
    width: "90%"
  },
  flatlistWrapper: { height: hp(55), marginTop: 10 },
  iconStyle: { color: "#fff", alignSelf: "center" }
});

export default styles;
