import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../../Global Styles/";
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
    fontFamily: "montserrat-regular",
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
  budget: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 27,
    fontFamily: "montserrat-medium",
    textAlign: "center"
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 17,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10
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
  itemCircles: {
    fontSize: 30,
    color: globalColors.orange
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
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "transparent",
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#000",
    marginLeft: 0,
    marginRight: 0
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

  dateInput: {
    marginBottom: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 15,
    alignSelf: "center",
    width: 270,
    height: hp(7.7),
    justifyContent: "center",
    borderWidth: 0.5
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
    flexDirection: "column",
    top: hp(5),
    left: wp(9)
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
    marginVertical: 5
  },
  interestButton: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  icon: {
    fontSize: 70,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  editIcon: {
    fontSize: 20,
    color: globalColors.orange,

    alignSelf: "center"
  },
  inactivebutton: {
    alignSelf: "center",
    width: hp("15"),
    height: hp("15"),
    marginBottom: 10
  },
  activebutton: {
    alignSelf: "center",
    width: hp("15"),
    height: hp("15")
  },
  inactivetext: {
    fontFamily: "montserrat-semibold",
    fontSize: 16,
    color: "#fff",
    marginLeft: 20
  },
  activetext: {
    fontFamily: "montserrat-semibold",
    fontSize: 16,
    color: globalColors.orange,
    marginLeft: 20
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
    fontFamily: "montserrat-regular",
    fontSize: hp(2),
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
