import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    // top: 5,
    backgroundColor: "#0000",
  },
  loadingText: {
    fontSize: RFValue(14, 414),
    lineHeight: 18,
    color: "#FFF",
    fontFamily: "montserrat-regular",
    textAlign: "center",
    width: "60%",
    marginVertical: RFValue(10, 414),
  },
  loadingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#0000",
  },
  logoContainer: {
    alignSelf: "center",
    marginTop: RFValue(10, 414),
    marginBottom: RFValue(5, 414),
  },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: RFValue(11, 414),
    fontFamily: "montserrat-medium-english",
    // bottom: "21%"
  },
  media: {
    height: "100%",
    width: "100%",
  },
  welcomeView: {
    display: "flex",
    alignItems: "center",
  },
  welcomeText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9, 414),
    lineHeight: 22,
    color: "#FFF",
  },
  optimizeAppText: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(12, 414),
    lineHeight: 29,
    color: "#FFF",
  },
  chooseLanguageText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    lineHeight: 18,
    color: "#FFF",
    marginVertical: 6,
    textAlign: "center",
  },
  imageView: {
    width: "100%",
    display: "flex",
    height: hp(25),
    // overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  languageButton: {
    width: RFValue(75, 414),
    height: RFValue(25.5, 414),
    marginHorizontal: 0,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: RFValue(12.5, 414),
    width: RFValue(150, 414),
    alignSelf: "center",
    marginVertical: RFValue(9, 414),
  },
  englishText: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(7.5, 414),
    // lineHeight: 19
  },
  arabicText: {
    fontFamily: "changa-bold-arabic",
    fontSize: RFValue(7.5, 414),
    // lineHeight: 19
  },
  inactiveText: {
    color: "rgba(255,255,255,0.6)",
  },
  bottomButton: {
    // flex: 1,
    width: RFValue(22.5, 414),
    height: RFValue(22.5, 414),
    alignSelf: "center",
    bottom: heightPercentageToDP(4),
  },
});

export default styles;
