import { StyleSheet, PixelRatio } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000"
  },
  topContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignSelf: "center"
  },
  businessTypeButton1: {
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 15,
    borderTopStartRadius: 15
  },
  businessTypeButton2: {
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 0,
    borderTopStartRadius: 0
  },
  businessTypeButton3: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 15,
    borderTopEndRadius: 15
  },
  iconButtonStyleLeft: {
    left: 25,
    fontSize: 25 / PixelRatio.getFontScale()
  },
  iconButtonStyle2: {
    alignSelf: "center",
    fontSize: 25 / PixelRatio.getFontScale()
  },
  iconButtonStyle3: {
    fontSize: 25 / PixelRatio.getFontScale(),
    bottom: 5
  },

  subTitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    textAlign: "center",
    fontFamily: "montserrat-light",
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  mainContainer: {
    // marginTop: 30,
    marginTop: 0,
    backgroundColor: "#0000",
    flex: 1
  },
  mainCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 30,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: "#fff",
    borderColor: "#0000",
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    shadowColor: "#0000",
    shadowRadius: 0,
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    paddingTop: 15
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    backgroundColor: "#fff",
    height: 70,
    justifyContent: "center",
    flexDirection: "column"
  },
  activeButton: {
    backgroundColor: "#FF9D00",
    height: 70,
    justifyContent: "center",
    flexDirection: "column"
  },
  inactiveText: {
    fontFamily: "montserrat-medium",
    fontSize: 12,
    color: "#7039FF",
    textAlign: "center"
  },
  activeText: {
    fontFamily: "montserrat-medium",
    fontSize: 12,
    color: "#fff",
    textAlign: "center"
  },
  container: {
    justifyContent: "center",
    paddingTop: 10,
    flex: 1
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 40
  },
  buttonText: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center"
  },
  label: {
    textAlign: "center",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center"
  },
  inputText: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    textAlign: "center"
    // marginBottom: 130
  },
  pickerText: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    textAlign: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "rgb(113,113,113)"
  },
  input: {
    marginBottom: 30,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 60,
    borderColor: "#7039FF"
  },
  bottomCard: {
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: heightPercentageToDP(10)
  },
  link: {
    textAlign: "center",
    color: "#707070",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  tNcLink: {
    textDecorationLine: "underline",
    color: "blue"
  },
  buttonLink: {
    lineHeight: 20
  },
  textAgreement: {
    bottom: 10
  },
  agreementLink: {
    zIndex: 10
  },
  iconStartUp: {
    fontSize: 14 / PixelRatio.getFontScale()
  },
  iconBrandName: {
    fontSize: 18 / PixelRatio.getFontScale(),
    alignSelf: "flex-end"
  },
  iconEmail: {
    fontSize: 20 / PixelRatio.getFontScale()
  },
  iconDown: {
    color: "#5F5F5F",
    fontSize: 20,
    left: 25
  },
  labelEmail: {
    bottom: 5,
    flexDirection: "row"
  }
});

export default styles;
