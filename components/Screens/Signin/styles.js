import { StyleSheet, PixelRatio, Dimensions, I18nManager } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1
  },
  bottomInviteViewContainer: { bottom: "5%" },
  textInviteCode: { fontFamily: "montserrat-bold" },
  logoContainer: {
    flexDirection: "row"
  },
  signTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center"
  },
  signInButton: {
    height: 50,
    width: "100%",
    marginHorizontal: 0
  },
  signText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textTransform: "capitalize"
  },
  activeTabView: {
    borderBottomWidth: 5,
    paddingBottom: 5,
    borderBottomColor: "#FFF",
    borderRadius: 5
  },
  tabView: {
    paddingBottom: 10,
    paddingHorizontal: 20
  },
  dontHaveAccountText: {
    paddingBottom: 5,
    fontSize: 14,
    fontFamily: "montserrat-regular"
  },

  keyboardShiftContainer: { flex: 1, alignItems: "center" },
  outView: {
    // flex: 1
  },
  forgotPasswordLink: { paddingVertical: 10, fontSize: 12, zIndex: 10 },
  SignInCoverImage: {
    position: "absolute",
    alignSelf: "flex-end",
    zIndex: -1,
    elevation: 1, //For android to show up
    bottom: 0,
    borderColor: "transparent",
    left: I18nManager.isRTL ? widthPercentageToDP(-25) : widthPercentageToDP(18)
  },
  title: { color: "#000", fontSize: 48 },
  container: {
    flex: 1,
    alignItems: "center"
  },
  gradientBtn: {
    height: 54,
    width: "100%",
    marginHorizontal: 0
  },
  gradientBtnText: { fontSize: 14 },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium-english"
    // bottom: "21%"
  },

  mainView: {
    // flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30
  },
  heading: {
    textAlign: "left",
    alignSelf: "flex-start",
    color: "#FFF",
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: 25,
    paddingVertical: 15
  },
  text: {
    textAlign: "center",
    color: "#fff",
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
    color: "#FFF"
  },
  proceedButtonRTL: {
    width: 55,
    height: 55
  }
});

export default styles;
