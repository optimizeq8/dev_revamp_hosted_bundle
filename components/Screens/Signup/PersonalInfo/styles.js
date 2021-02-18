import { StyleSheet, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  marginVertical: {
    marginBottom: 30,
  },
  personalInfoView: {
    backgroundColor: "#0000",
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 0,
  },
  mobileView: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 25,
  },
  inputLabel: {
    // marginBottom: -10,
    marginTop: RFValue(5, 414),
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    color: "#FFF",
    textAlign: "left",
    textTransform: "uppercase",
  },
  labelEmail: {
    flexDirection: "row",
  },
  labelPassword: {
    bottom: 5,
  },
  labelIcon: {
    fontSize: 20 / PixelRatio.getFontScale(),
  },
  repeatPassword: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  scrollViewStyleContainer: {
    flex: 1,
    marginVertical: 10,
  },
  labelInputText: {
    // bottom: 5,
    flexDirection: "column",
  },
  iconSize: {
    // position: "absolute",
    // marginLeft: 15,
    fontSize: RFValue(8 / PixelRatio.getFontScale(), 414),
  },
  emailerrorText: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7.5, 414),
    // bottom: 40,
    alignSelf: "center",
    justifyContent: "center",
  },
  passwordErrorText: {
    paddingVertical: RFValue(5, 414),
  },
  repassworderrorText: {
    bottom: RFValue(7.5, 414),
    paddingTop: 0,
    marginBottom: 0,
    paddingVertical: 0,
  },
  container: {
    paddingTop: RFValue(10, 414),
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  contentContainer: {
    paddingVertical: 40,
    flex: 1,
    justifyContent: "space-around",
  },
  icon: {
    fontSize: 45,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    paddingTop: 5,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    // paddingVertical: 10,
    // marginBottom: 40
  },
  inputText: {
    fontFamily: "montserrat-light-english",
    fontSize: RFValue(7 / PixelRatio.getFontScale(), 414),
    // alignSelf: "left",
    textAlign: "left",
    color: "#FFF",
    marginBottom: RFValue(5, 414),
    width: "100%",
    paddingVertical: 0,
  },
  colView: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    marginLeft: RFValue(6.5, 414),
    width: "90%",
  },
  // input: {
  //   // bottom: 25,
  //   marginBottom: 20,
  //   paddingHorizontal: 50,
  //   borderRadius: 15,
  //   alignSelf: "center",
  //   width: 300,
  //   height: 45,
  //   borderColor: "#7039FF"
  // },
  input: {
    backgroundColor: "rgba(0,0,0,0.16)",
    borderRadius: RFValue(75, 414),
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: "100%",
    borderWidth: 0,
    height: RFValue(27, 414),
    paddingHorizontal: RFValue(10, 414),
    display: "flex",
    alignItems: "center",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  labelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1,
  },
  submitButton: {
    height: RFValue(27, 414),
    width: "100%",
    alignSelf: "center",
  },
  subHeading: {
    fontSize: RFValue(9.5, 414),
    color: "#FFF",
    fontFamily: "montserrat-bold",
    marginLeft: RFValue(8, 414),
    textTransform: "uppercase",
  },
  subHeadView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 26,
    marginVertical: 15,
  },
  link: {
    textAlign: "center",
    color: "#FFF",
    paddingTop: RFValue(20, 414),
    paddingBottom: RFValue(5, 414),
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(5, 414),
  },
  tNcLink: {
    textDecorationLine: "underline",
    // color: "blue"
  },
  buttonLink: {
    lineHeight: 20,
  },
  textAgreement: {
    // bottom: 10,
    paddingHorizontal: 70,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  agreementLink: {
    zIndex: 10,
  },
});

export default styles;
