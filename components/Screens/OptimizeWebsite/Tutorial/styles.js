import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000"
    // position: "absolute"
  },
  headerCardView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10
  },
  headerText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#FFF",
    textTransform: "uppercase"
  },
  getStartedText: {
    fontFamily: "montserrat-bold",
    fontSize: 11,
    color: "#FFF",
    textTransform: "uppercase",
    paddingHorizontal: 5
  },
  getStartedBtn: {
    height: 44,
    // paddingHorizontal: 30,
    // width: 150,
    // flexDirection: ,
    marginHorizontal: 0,
    alignContent: "center"
  },
  getStartView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  paginationDotStyle: {
    borderRadius: 7,
    height: 14,
    marginHorizontal: -5,
    width: 14
  },
  mainView: {
    height: heightPercentageToDP(60),
    borderRadius: 35,
    overflow: "hidden",
    alignSelf: "center",
    // alignItems: "center",
    paddingTop: heightPercentageToDP(2),
    // justifyContent: "center",
    width: widthPercentageToDP(80)
  },
  paginationContainerStyle: {
    paddingVertical: 25,
    zIndex: 1
    // left: widthPercentageToDP(18)
  },
  customerWhatsapp: {
    fontFamily: "montserrat-bold",
    fontSize: 15,
    color: "#9204FE",
    textTransform: "uppercase",
    paddingTop: 5,
    width: "60%"
  },
  customerWhatsappView: {
    flexDirection: "column",
    paddingHorizontal: 35,
    paddingBottom: 30
  },
  ss3: {
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(55),
    marginBottom: heightPercentageToDP(-18)
  },
  slide3View: {
    backgroundColor: "#FFF",
    borderRadius: 35,
    overflow: "hidden"
  },
  ss2: {
    alignSelf: "center",
    width: widthPercentageToDP(100),
    height: heightPercentageToDP(40)
  },
  readyWithinText: {
    fontFamily: "montserrat-bold",
    fontSize: 15,
    color: "#9204FE",
    textTransform: "uppercase",
    lineHeight: 22
  },
  freeChargeText: {
    fontFamily: "montserrat-bold",
    fontSize: 15,
    color: "#9204FE",
    textTransform: "uppercase",
    lineHeight: 22
  },
  readyWithinTextView: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 8,
    alignSelf: "center"
  },
  freeChargeView: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 20
  },
  slide2View: {
    backgroundColor: "#FFF",
    borderRadius: 35,
    overflow: "hidden"
  },
  syncedText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#9204FE"
  },
  maintainText: {
    fontFamily: "montserrat-bold",
    fontSize: 15,
    color: "#9204FE",
    textTransform: "uppercase"
  },
  handArrowView: {
    paddingHorizontal: 25,
    marginTop: heightPercentageToDP(-12),

    paddingBottom: 20
  },
  ss1: {
    height: heightPercentageToDP(45),
    alignSelf: "flex-start",
    marginLeft: widthPercentageToDP(-10)
  },
  slide1View: {
    backgroundColor: "#FFF",
    borderRadius: 35,
    overflow: "hidden"
  },
  onlineStoreHomeIcon: {
    position: "absolute",
    bottom: "-5%",
    left: "-12%",
    zIndex: -1
  }
});

export default styles;
