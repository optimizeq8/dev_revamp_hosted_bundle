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
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  textCon: {
    width: 320,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center"
  },

  colorGrey: {
    color: "#fff"
  },
  colorYellow: {
    color: "#FF9D00",
    fontSize: 27,
    fontFamily: "montserrat-medium"
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  slidercontainer: { marginHorizontal: 40 },
  input: {
    marginBottom: 15,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
  },

  indicator: {
    fontSize: 30,
    marginRight: 20,
    color: "#fff"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "center",
    height: 40,
    width: 40,
    margin: 15
  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  btnClose: {
    top: hp("1%")
  },
  BlurView: {
    height: hp("110%"),
    paddingTop: hp("10%")
  },
  dateModal: {
    ...StyleSheet.absoluteFillObject,
    height: hp("110%"),
    marginTop: -hp("5"),
    borderRadius: 30
  },
  button: {
    alignSelf: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: hp("10%")
  },
  dateInput: {
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    alignSelf: "center",
    width: 270,
    height: 65,
    justifyContent: "center"
  },
  icon: {
    alignSelf: "center",
    marginBottom: 10
  },
  calender: {
    width: wp("85%"),
    alignSelf: "center"
  },
  textModal: {
    textAlign: "center",
    color: "#fff",

    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 20
  },
  chart: {
    alignItems: "center",
    height: hp("20%")
  },
  chartText: {
    color: "#fff",
    fontFamily: "montserrat-semibold",
    fontSize: 16,
    textAlign: "center",
    justifyContent: "center"
  },
  chartItems: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    top: 50,
    left: 40
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  icon: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  inactivebutton: {
    backgroundColor: "#fff",
    alignSelf: "center",
    width: hp("15"),
    height: hp("15"),
    borderRadius: 100,
    marginBottom: 10
  },
  activebutton: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: hp("15"),
    height: hp("15"),
    borderRadius: 100,
    marginBottom: 10
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#7039FF"
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#fff"
  },
  categories: {
    textAlign: "center",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingVertical: 10
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingHorizontal: 10
  },
  headline: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-semibold",
    fontSize: 14,
    paddingBottom: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  menutext: {
    paddingLeft: 15,
    fontSize: 13,
    fontFamily: "montserrat-light",
    color: "#fff",
    paddingVertical: 3
  },
  menudetails: {
    paddingLeft: 15,
    color: "#fff",
    fontFamily: "montserrat-extralight",
    fontSize: 11
  }
});

export default styles;
