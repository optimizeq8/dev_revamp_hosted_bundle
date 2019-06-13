import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  calender: {
    width: wp("85%"),
    alignSelf: "center"
  },
  dateModal: {
    ...StyleSheet.absoluteFillObject,
    height: "110%",
    borderRadius: 30
  },
  safeArea: {
    height: "100%",
    backgroundColor: "#0000"
  },
  BlurView: {
    // height: "100%"
    // paddingTop: hp("10%")
  },
  button: {
    backgroundColor: "transparent",
    alignSelf: "center",
    borderRadius: 50,
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    top: heightPercentageToDP(5) < 30 ? -5 : 30
  },
  icon: {
    fontSize: 70,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  textModalLight: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 14,
    paddingVertical: 10
  },
  textModalOrange: {
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 10,
    color: "#FF9D00"
  },
  textModal: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 10
  }
});

export default styles;
