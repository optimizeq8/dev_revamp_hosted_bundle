import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  mainCard: {
    backgroundColor: "#0000"
  },
  logo: { alignSelf: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    // marginTop: 30,
    backgroundColor: "#0000",
    flex: 1
  },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium-english"
    // bottom: "24%"
  },
  mainView: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 30,
    // paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: "center",
    width: 275,
    height: 50
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 14
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  proceedButtonRTL: {
    width: 65,
    height: 65,
    backgroundColor: globalColors.orange,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4
    // padding: 20
  }
});

export default styles;
