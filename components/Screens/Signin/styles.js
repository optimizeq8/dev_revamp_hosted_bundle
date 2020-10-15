import { StyleSheet, PixelRatio, Dimensions, I18nManager } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
  },
  logoContainer: {
    flexDirection: "row",
  },
  signTextContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "auto",
    alignItems: "center",
  },
  signText: {
    fontSize: 14,
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
  forgotPasswordLink: { paddingVertical: 10, fontSize: 12, zIndex: 10 },
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
    height: 54,
    width: "100%",
    marginHorizontal: 0,
  },
  gradientBtnText: { fontSize: 14 },

  mainView: {
    // flex: 1,
    paddingTop: 40,
    paddingHorizontal: 30,
  },
  heading: {
    textAlign: "left",
    alignSelf: "flex-start",
    color: "#FFF",
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: 25,
    paddingVertical: 15,
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 12,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default styles;
