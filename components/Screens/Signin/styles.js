import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0000"
  },
  touchableViewContainer: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  bottomInviteViewContainer: { bottom: "5%" },
  textInviteCode: { fontFamily: "montserrat-bold" },
  logoContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-around"
    // marginBottom: 10
  },
  signTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center"
  },
  signText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular"
  },
  dontHaveAccountText: {
    paddingBottom: 5,
    fontSize: 14,
    fontFamily: "montserrat-regular"
  },

  keyboardShiftContainer: { flex: 1, alignItems: "center" },
  forgotPasswordLink: { paddingVertical: 10, fontSize: 12 },
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: heightPercentageToDP(3),
    flex: 1,
    backgroundColor: "#0000",
    alignItems: "center",
    width: "100%"
  },
  logo: {
    // alignSelf: "flex-start"
    // fontSize: 50
    // position: "relative"
    // top: heightPercentageToDP(1)
  },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium-english"
    // bottom: "21%"
  },

  mainView: {
    // flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center"
    // borderWidth: 1
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 0
  },
  buttonText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: widthPercentageToDP(20),
    marginRight: 15
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 30,
    alignSelf: "center",
    width: 275,
    height: 50
  },
  button: {
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    marginBottom: 10,
    backgroundColor: globalColors.orange,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50,
    marginTop: 10
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 12
  },
  bottomView: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 13,
    width: 200,
    height: 40,
    justifyContent: "center"
  },
  background: {
    position: "absolute",
    top: "10%",

    opacity: 0.3,
    alignSelf: "center",
    zIndex: 0
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  createOneText: {
    fontFamily: "montserrat-bold-english",
    fontSize: 18,
    color: globalColors.darkOrange,
    textAlign: "center",
    lineHeight: 22
  },
  inputIcon: {
    marginLeft: 12,
    flex: 0,
    // position: "absolute",
    color: "#FFF"
  },
  proceedButtonRTL: {
    width: 55,
    height: 55
  }
});

export default styles;
