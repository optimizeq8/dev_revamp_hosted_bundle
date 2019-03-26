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
    fontFamily: "montserrat-medium",
    fontSize: 18,
    width: 150,
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
    color: "#d3d3d3"
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
    borderColor: "#fff",
    flex: 1,
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
    height: hp("100%"),
    paddingTop: hp("10%")
  },
  dateModal: {
    ...StyleSheet.absoluteFillObject,
    height: hp("100%")
  },
  button: {
    alignSelf: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: hp("10%")
  },
  dateInput: {
    marginBottom: 15,

    backgroundColor: "#D9D9D9",

    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
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
  }
});

export default styles;
