import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000",
    // position: "absolute"
  },
  headerCardView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  headerText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9, 414),
    color: "#FFF",
    textTransform: "uppercase",
  },
  getStartedText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6.5, 414),
    color: "#FFF",
    textTransform: "uppercase",
    paddingHorizontal: 5,
  },
  getStartedBtn: {
    height: RFValue(22, 414),
    // paddingHorizontal: 30,
    // width: 150,
    // flexDirection: ,
    marginHorizontal: 0,
    alignContent: "center",
  },
  getStartView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: RFValue(10, 414),
  },
  paginationDotStyle: {
    borderRadius: 7,
    height: RFValue(7, 414),
    marginHorizontal: -5,
    width: RFValue(7, 414),
  },
  mainView: {
    height: heightPercentageToDP(60),
    borderRadius: RFValue(17.5, 414),
    overflow: "hidden",
    alignSelf: "center",
    // alignItems: "center",
    paddingTop: heightPercentageToDP(2),
    // justifyContent: "center",
    width: widthPercentageToDP(80),
  },
  paginationContainerStyle: {
    paddingVertical: 25,
    zIndex: 1,
    // left: widthPercentageToDP(18)
  },
  customerWhatsapp: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7.5, 414),
    color: "#9204FE",
    textTransform: "uppercase",
    paddingTop: 5,
    width: "60%",
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    textAlign: I18nManager.isRTL ? "right" : "left",
  },
  customerWhatsappView: {
    flexDirection: "column",
    paddingHorizontal: 35,
    paddingBottom: 30,
  },
  ss3: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(55),
    marginBottom: heightPercentageToDP(-18),
  },
  slide3View: {
    backgroundColor: "#FFF",
    borderRadius: RFValue(17.5, 414),
    overflow: "hidden",
  },
  ss2: {
    alignSelf: "center",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(40),
  },
  readyWithinText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7.5, 414),
    color: "#9204FE",
    textTransform: "uppercase",
    lineHeight: RFValue(11, 414),
  },
  freeChargeText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7.5, 414),
    color: "#9204FE",
    textTransform: "uppercase",
    lineHeight: RFValue(11, 414),
    textAlign: "left",
  },
  readyWithinTextView: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: RFValue(4, 414),
    alignSelf: "center",
    textAlign: "left",
  },
  freeChargeView: {
    display: "flex",
    flexDirection: "row",
    paddingTop: RFValue(10, 414),
    paddingVertical: RFValue(7.5, 414),
    paddingHorizontal: RFValue(10, 414),
  },
  slide2View: {
    backgroundColor: "#FFF",
    borderRadius: RFValue(17.5, 414),
    overflow: "hidden",
  },
  syncedText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    color: "#9204FE",
    textAlign: "left",
  },
  maintainText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7.5, 414),
    color: "#9204FE",
    textTransform: "uppercase",
    textAlign: "left",
  },
  handArrowView: {
    paddingHorizontal: RFValue(12.5, 414),
    marginTop: heightPercentageToDP(-8),

    paddingBottom: RFValue(10, 414),
  },
  ss1: {
    height: heightPercentageToDP(45),
    width: widthPercentageToDP(100),
    alignSelf: "flex-start",
    marginLeft: I18nManager.isRTL ? 0 : widthPercentageToDP(-15),
  },
  slide1View: {
    backgroundColor: "#FFF",
    borderRadius: RFValue(17.5, 414),
    overflow: "hidden",
  },
  onlineStoreHomeIcon: {
    position: "absolute",
    bottom: "-5%",
    left: I18nManager.isRTL ? "12%" : "-12%",
    zIndex: -1,
  },
  handsArrowIcon: {
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
  },
});

export default styles;
