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
    justifyContent: "space-between"
  },

  colorGrey: {
    color: "#fff"
  },
  colorYellow: {
    color: "rgb(252, 228, 149)"
  },
  inputtext: {
    fontFamily: "benton-sans-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  slidercontainer: { marginHorizontal: 30 },
  input: {
    marginBottom: 15,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
  },
  buttonN: {
    padding: 10,
    paddingTop: 0,
    bottom: 15
  },
  indicator: {
    fontSize: 30,
    marginRight: 20,
    color: "#a9a"
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
  mainCard: {
    top: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "transparent",
    flex: 1,

    backgroundColor: "#ffcc00",
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10
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
    marginBottom: 15,
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
    color: "#000",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    textAlign: "center"
  },
  chartItems: {
    alignItems: "center",
    left: wp("9%"),
    bottom: hp("10%")
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
    shadowOpacity: 0.2,
    marginVertical: 5
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
  }
});

export default styles;
