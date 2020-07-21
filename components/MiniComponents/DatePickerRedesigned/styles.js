import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  calender: {
    width: wp("100%"),
  },
  dateModal: {
    ...StyleSheet.absoluteFillObject,
    height: "110%",
    borderRadius: 30,
  },
  safeArea: {
    height: "100%",
    backgroundColor: "#fff",
    top: heightPercentageToDP(20),
    paddingRight: 20,
    borderRadius: 50,
    paddingTop: 20,
  },
  BlurView: {
    // height: "100%"
    // paddingTop: hp("10%")
  },
  button: {
    top: heightPercentageToDP(5) < 30 ? -5 : 20,
  },
  icon: {
    fontSize: 70,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  textModalLight: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 14,
    paddingVertical: 10,
  },
  textModalOrange: {
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 10,
    color: "#FF9D00",
  },
  textModal: {
    textAlign: "center",
    color: "#000",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 10,
  },
  resetStyle: {
    color: "#fff",
    fontSize: 15,
    alignSelf: "flex-end",
  },
});

export default styles;
