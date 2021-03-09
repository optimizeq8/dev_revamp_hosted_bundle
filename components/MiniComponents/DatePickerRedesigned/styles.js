import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
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
    paddingRight: RFValue(10, 414),
    borderRadius: RFValue(25, 414),
    paddingTop: RFValue(10, 414),
  },
  BlurView: {
    // height: "100%"
    // paddingTop: hp("10%")
  },
  button: {
    top: heightPercentageToDP(5) < 30 ? -5 : 20,
  },
  icon: {
    fontSize: RFValue(35, 414),
    color: "#fff",
    paddingLeft: RFValue(2.5, 414),
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  textModalLight: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: RFValue(7, 414),
    paddingVertical: RFValue(5, 414),
  },
  textModalOrange: {
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    paddingVertical: RFValue(5, 414),
    color: "#FF9D00",
  },
  textModal: {
    textAlign: "center",
    color: "#000",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    paddingVertical: RFValue(5, 414),
  },
  resetStyle: {
    color: "#fff",
    fontSize: RFValue(7.5, 414),
    alignSelf: "flex-end",
  },
  footerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: RFValue(6, 414),
  },
  campaignDurationContainerStyle: {
    width: "80%",
    top: RFValue(3.5, 414),
    backgroundColor: "#0002",
  },
  loadingBackground: {
    backgroundColor: "#0005",
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});

export default styles;
