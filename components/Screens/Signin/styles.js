import { StyleSheet, I18nManager } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: globalColors.bluegem,
  },
  logoContainer: {
    flexDirection: "row",
  },
  signTextContainer: {
    display: "flex",
    flexDirection: "row",
    // marginLeft: "auto",
    alignItems: "center",
    marginBottom: RFValue(10, 414),
  },
  signText: {
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-regular",
    textTransform: "capitalize",
  },
  activeTabView: {
    borderBottomWidth: 5,
    paddingBottom: 5,
    borderBottomColor: "#FFF",
    borderRadius: 5,
  },
  tabView: {
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  forgotPasswordLink: {
    paddingVertical: RFValue(5, 414),
    fontSize: RFValue(6, 414),
    zIndex: 10,
  },
  SignInCoverImage: {
    position: "absolute",
    alignSelf: "flex-end",
    bottom: 0,
    zIndex: 0,
    borderColor: "transparent",
    left: I18nManager.isRTL
      ? widthPercentageToDP(-25)
      : widthPercentageToDP(18),
  },

  container: {
    flex: 1,
    alignItems: "center",
  },
  gradientBtn: {
    height: RFValue(27, 414),
    width: "100%",
    marginHorizontal: 0,
  },
  gradientBtnText: { fontSize: RFValue(7, 414) },

  mainView: {
    // flex: 1,
    // paddingTop: 40,
    paddingHorizontal: 30,
  },
  heading: {
    textAlign: "left",
    alignSelf: "flex-start",
    color: "#FFF",
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(12.5, 414),
    paddingVertical: RFValue(7.5, 414),
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
