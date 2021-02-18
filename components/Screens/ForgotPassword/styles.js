import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "#0000",
  },
  logo: { alignSelf: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    // marginTop: 30,
    backgroundColor: "#0000",
    flex: 1,
  },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium-english",
    // bottom: "24%"
  },
  mainView: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 30,
    // paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: RFValue(12, 414),
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
  },
  input: {
    marginTop: 30,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    paddingHorizontal: 20,
    borderRadius: 30,
    alignSelf: "center",
    // width: 275,
    marginLeft: 30,
    marginRight: 30,
    height: 50,
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: RFValue(7, 414),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  proceedButtonRTL: {
    width: 65,
    height: 65,
  },
  forgotPasswordMessageView: { marginVertical: 10, marginHorizontal: 30 },
  forgotPasswordMessage: {
    textAlign: "center",
    color: "#FFFFFF",
    fontSize: 14,
    textDecorationLine: "underline",
    fontFamily: "montserrat-bold",
  },
  messageView: {
    alignItems: "center",
    marginVertical: 30,
  },
  exclamation: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: globalColors.red,
    borderRadius: 30,
  },
});

export default styles;
