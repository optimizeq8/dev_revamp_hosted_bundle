import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    // top: 5,
    backgroundColor: "#0000"
  },
  loadingText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#FFF",
    fontFamily: "montserrat-regular",
    textAlign: "center",
    width: "60%",
    marginVertical: 20
  },
  loadingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    flex: 1,
    backgroundColor: "#0000"
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 10
  },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium-english"
    // bottom: "21%"
  },
  media: {
    height: "100%",
    width: "100%"
  },
  welcomeView: {
    display: "flex",
    alignItems: "center"
  },
  welcomeText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    lineHeight: 22,
    color: "#FFF"
  },
  optimizeAppText: {
    fontFamily: "montserrat-bold-english",
    fontSize: 24,
    lineHeight: 29,
    color: "#FFF"
  },
  chooseLanguageText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    lineHeight: 18,
    color: "#FFF",
    marginVertical: 6,
    textAlign: "center"
  },
  imageView: {
    width: "100%",
    display: "flex",
    height: hp(25),
    // overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  languageButton: {
    width: 150,
    height: 50,
    marginHorizontal: 0
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 25,
    width: 300,
    alignSelf: "center",
    marginVertical: 18
  },
  englishText: {
    fontFamily: "montserrat-bold-english",
    fontSize: 15
    // lineHeight: 19
  },
  arabicText: {
    fontFamily: "changa-bold-arabic",
    fontSize: 15
    // lineHeight: 19
  },
  inactiveText: {
    color: "rgba(255,255,255,0.6)"
  },
  bottomButton: {
    // flex: 1,
    width: 55,
    height: 55,
    alignSelf: "center",
    bottom: heightPercentageToDP(4)
  }
});

export default styles;
