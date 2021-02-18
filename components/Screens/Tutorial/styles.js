import { StyleSheet, I18nManager, Dimensions } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import globalStyles, { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: RFValue(15, 414),
    borderTopLeftRadius: RFValue(15, 414),
    borderTopRightRadius: 0,
    borderBottomLeftRadius: RFValue(15, 414),
    borderBottomRightRadius: 0,
    // marginVertical : RFValue(4, 414),
    shadowOpacity: 1,
    shadowRadius: RFValue(15, 414),
    shadowColor: "#5314B4",
    elevation: RFValue(4, 414),
    shadowOffset: { height: 6, width: 0 },
    paddingVertical: RFValue(5, 414),
    borderTopLeftRadius: RFValue(15, 414),
    paddingHorizontal: RFValue(12.5, 414),
    zIndex: -19,
  },
  shopCard: {
    left: widthPercentageToDP(8),

    width: widthPercentageToDP(100),
  },
  campaignButton: {
    padding: RFValue(10, 414),
  },
  textcontainer: {
    flexDirection: "column",
  },
  header: {
    flexDirection: "row",
    paddingVertical: 0,
    alignItems: "center",
  },
  titleText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    textAlign: "left",
  },
  adStatus: {
    borderRadius: RFValue(8, 414),
    paddingTop: RFValue(1.5, 414),
    flexDirection: "row",
    alignItems: "center",
  },
  circleIcon: { color: "#fff", fontSize: 16 },
  reviewText: {
    fontFamily: "montserrat-bold",
    textAlign: "left",
    fontSize: RFValue(6.5, 414),
    paddingHorizontal: RFValue(2.5, 414),
    color: "#fff",
    textTransform: "uppercase",
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  channelIcon: {
    position: "absolute",
    top: -15,
  },
  horizontalLineView: {
    width: RFValue(1.5, 414),
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
  cardStatusDays: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
    paddingLeft: RFValue(2.5, 414),
  },
  cardText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    textAlign: "center",
    textTransform: "uppercase",
  },
  screen1OuterView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: RFValue(10, 414),
    alignSelf: "center",
    alignItems: "center",
  },
  adDesignTopView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: I18nManager.isRTL ? 5 : RFValue(4, 414),
  },
  adDesignDetailView: {
    marginHorizontal: RFValue(5, 414),
  },
  adDesignHeading: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(4, 414),
    color: "#FFF",
    textAlign: "left",
  },
  adDesignDescp: {
    fontFamily: "montserrat-medium-english",
    color: "#FFF",
    textAlign: "left",
    fontSize: RFValue(5.5, 414),
  },
  mediaButtonView: {
    display: "flex",
    alignItems: "center",
    marginBottom:
      Dimensions.get("window").width > 400
        ? RFValue(50, 414)
        : RFValue(40, 414),
    marginTop:
      Dimensions.get("window").width > 400
        ? RFValue(50, 414)
        : RFValue(20, 414),
    alignSelf: "center",
  },
  editText: {
    fontSize: RFValue(4.5, 414),
    fontFamily: "montserrat-medium",
    color: globalColors.orange,
    textAlign: "center",
  },
  swipeUpView: {
    backgroundColor: globalColors.orange,
    paddingVertical: RFValue(5, 414),
    width: 220,
    borderRadius: RFValue(15, 414),
    alignSelf: "center",
    marginBottom: RFValue(5, 414),
  },
  adDesignWebsite: {
    fontFamily: "montserrat-medium",
    color: "#FFF",
    fontSize: RFValue(5.5, 414),
    textAlign: "center",
    textTransform: "uppercase",
  },
  adDesignWebsitePlaceholder: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(4, 414),
    textAlign: "center",

    color: "#FFF",
  },
  downIcon: {
    position: "absolute",
    right: RFValue(7.5, 414),
    top: 6,
    color: "#fff",
    width: RFValue(12.5, 414),
    height: RFValue(12.5, 414),
    fontSize: RFValue(15, 414),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  block: {
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    position: "absolute",
    zIndex: 1,
    left: -16,
  },
  block1: {
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    marginLeft: widthPercentageToDP(10),
  },
  block3: {
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    position: "absolute",
    zIndex: 1,
    top: -12,
  },
  blockText: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(8.5, 414),
  },
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000",
  },
  imageView: { backgroundColor: "#fff" },
  getStartedText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(5.5, 414),
    textAlign: "center",
  },
  getStartedButton: {
    alignSelf: "center",
    zIndex: RFValue(50, 414),
    height: RFValue(20, 414),
    width: RFValue(55, 414),

    justifyContent: "center",
  },
  imageSlide: {
    height: heightPercentageToDP(100),
    flex: 1,
    alignContent: "center",
    alignSelf: "center",
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: RFValue(24, 414) },
  container: {
    backgroundColor: "transparent",
  },
  background: {
    position: "absolute",
    opacity: 0.2,
    top: "30%",
    alignSelf: "center",
    zIndex: 0,
  },
  media: {
    alignSelf: "center",
    height: RFValue(50, 414),
    width: RFValue(50, 414),
    margin: RFValue(7.5, 414),
  },

  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: RFValue(20, 414),
    paddingBottom: RFValue(5, 414),
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7.5, 414),
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(5, 414),
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  skipButton: {
    borderRadius: RFValue(10, 414),
    borderWidth: 1,
    ...globalStyles.whiteBorderColor,
    height: RFValue(20, 414),
    width: RFValue(55, 414),
    zIndex: 0,
  },
  bottomView: {
    display: "flex",
    flex: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: heightPercentageToDP(3.5),
    paddingHorizontal: RFValue(10, 414),
  },
  blockDescription: {
    marginVertical: RFValue(10, 414),
    alignSelf: "center",
  },
  heading: {
    fontSize: RFValue(10, 414),
    color: "#FFFF",
    fontFamily: "montserrat-bold",
    textAlign: "center",
    marginBottom: RFValue(4, 414),
  },
  description: {
    fontSize: RFValue(8, 414),
    marginTop: RFValue(4, 414),
    color: "#FFFF",
    fontFamily: "montserrat-semibold",
    textAlign: "center",
  },
  screen1innerView: {
    flexGrow: 1,
    alignContent: "center",
    marginVertical: RFValue(5, 414),
    width: RFValue(60, 414),
    marginHorizontal: RFValue(5, 414),
  },
  screen1Container: {
    backgroundColor: "rgba(0,0,0,0.15)",
    width: RFValue(45, 414),
    height: RFValue(45, 414),
    display: "flex",
    justifyContent: "center",
    borderRadius: RFValue(13, 414),
    alignSelf: "center",
    marginBottom: RFValue(3.5, 414),
  },
  slide1Title: {
    color: "#FFF",
    fontSize: RFValue(8.5, 414),
    textAlign: "center",
    textTransform: "uppercase",
  },
  graphImage: {
    height: heightPercentageToDP(30),
    width: widthPercentageToDP(100),
  },
  screen2OuterView: {
    display: "flex",
    alignItems: "center",
    borderRadius: RFValue(15, 414),
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: RFValue(12.5, 414),
    marginTop: RFValue(-7.5, 414),
  },
  bsnView: {
    alignSelf: "flex-start",
  },
  bsnBtnView: {
    alignSelf: "flex-start",
    zIndex: 2,
    elevation: 1,
  },
  lowerBtn: { width: RFValue(23, 414), height: RFValue(23, 414) },
  mainView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: RFValue(10, 414),
  },
  paginationContainerStyle: {
    paddingVertical: RFValue(2.5, 414),
    bottom: heightPercentageToDP(5),
    left: widthPercentageToDP(18),
  },
  paginationDotStyle: {
    borderRadius: RFValue(3.5, 414),
    height: RFValue(7, 414),
    marginHorizontal: RFValue(-2.5, 414),
    width: RFValue(7, 414),
  },
});

export default styles;
