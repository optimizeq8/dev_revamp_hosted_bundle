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
  container: {
    paddingTop: 30,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  image: {
    alignSelf: "center",
    height: 45,
    width: 45
  },

  mainCard: {
    top: 15,
    borderColor: "transparent",
    backgroundColor: "transparent",
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "benton-sans-Regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttontext: {
    fontFamily: "benton-sans-Regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "benton-sans-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },

  button: {
    alignSelf: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: hp("5%")
  },

  categories: {
    textAlign: "center",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "Montserrat-Regular",
    fontSize: 13,
    paddingHorizontal: 10
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Montserrat-SemiBold",
    fontSize: 20,
    paddingVertical: 10
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    width: 150,
    alignSelf: "center"
  },
  subtext: {
    fontFamily: "Montserrat-ExtraLight",
    fontSize: 14,
    paddingTop: 5,
    color: "#fff"
    // textAlign: "left"
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "Montserrat-Medium",
    fontSize: 16,
    paddingHorizontal: 10
  },
  bottomCard: {
    top: 15,
    height: 100
  },
  icon: {
    flexDirection: "column",
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 25,
    bottom: 5
  },
  gender: {
    // ...StyleSheet.absoluteFillObject,
    left: 17,

    top: 5,

    transform: [{ rotate: "-45deg" }]
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000"
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  toggleStyle: {
    width: 105,
    height: 33,
    borderRadius: 20,
    padding: 5
  },
  circleStyle: {
    width: 25,
    height: 25,
    borderRadius: 19
  },

  btnClose: {
    ...StyleSheet.absoluteFillObject,
    top: hp("10%"),
    left: wp("10%")
  },
  BlurView: {
    height: "100%",
    paddingTop: hp("20%")
  },
  pauseDes: {
    fontFamily: "Montserrat-Light",
    fontSize: wp("4%"),

    marginVertical: 20,
    padding: 20
  }
});

export default styles;
