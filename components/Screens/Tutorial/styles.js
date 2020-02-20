import { StyleSheet, I18nManager, Dimensions } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import globalStyles, { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  cardStyle: {
    borderRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 0,
    // marginVertical: 8,
    shadowOpacity: 1,
    shadowRadius: 30,
    shadowColor: "#5314B4",
    elevation: 8,
    shadowOffset: { height: 6, width: 0 },
    paddingVertical: 10,
    borderTopLeftRadius: 30,
    paddingHorizontal: 25,
    zIndex: -19
  },
  shopCard: {
    left: widthPercentageToDP(8),

    width: widthPercentageToDP(100)
  },
  campaignButton: {
    padding: 20
  },
  textcontainer: {
    flexDirection: "column"
  },
  header: {
    flexDirection: "row",
    paddingVertical: 0,
    alignItems: "center"
  },
  titleText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    textAlign: "left"
  },
  adStatus: {
    borderRadius: 16,
    paddingTop: 3,
    flexDirection: "row",
    alignItems: "center"
  },
  circleIcon: { color: "#fff", fontSize: 16 },
  reviewText: {
    fontFamily: "montserrat-bold",
    textAlign: "left",
    fontSize: 13,
    paddingHorizontal: 5,
    color: "#fff",
    textTransform: "uppercase"
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  channelIcon: {
    position: "absolute",
    top: -15
  },
  horizontalLineView: {
    width: 3,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.05)"
  },
  cardStatusDays: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    alignSelf: "center",
    paddingLeft: 5
  },
  cardText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "center",
    textTransform: "uppercase"
  },
  screen1OuterView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    alignSelf: "center",
    alignItems: "center"
  },
  adDesignTopView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: I18nManager.isRTL ? 5 : 8
  },
  adDesignDetailView: {
    marginHorizontal: 10
  },
  adDesignHeading: {
    fontFamily: "montserrat-bold",
    fontSize: 8,
    color: "#FFF",
    textAlign: "left"
  },
  adDesignDescp: {
    fontFamily: "montserrat-medium-english",
    color: "#FFF",
    textAlign: "left",
    fontSize: 11
  },
  mediaButtonView: {
    display: "flex",
    alignItems: "center",
    marginBottom: Dimensions.get("window").width > 400 ? 100 : 80,
    marginTop: Dimensions.get("window").width > 400 ? 100 : 40,
    alignSelf: "center"
  },
  editText: {
    fontSize: 9,
    fontFamily: "montserrat-medium",
    color: globalColors.orange,
    textAlign: "center"
  },
  swipeUpView: {
    backgroundColor: globalColors.orange,
    paddingVertical: 10,
    width: 220,
    borderRadius: 30,
    alignSelf: "center",
    marginBottom: 10
  },
  adDesignWebsite: {
    fontFamily: "montserrat-medium",
    color: "#FFF",
    fontSize: 11,
    textAlign: "center",
    textTransform: "uppercase"
  },
  adDesignWebsitePlaceholder: {
    fontFamily: "montserrat-bold-english",
    fontSize: 8,
    textAlign: "center",

    color: "#FFF"
  },
  downIcon: {
    position: "absolute",
    right: 15,
    top: 6,
    color: "#fff",
    width: 25,
    height: 25,
    fontSize: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  block: {
    width: 30,
    height: 30,
    position: "absolute",
    zIndex: 1,
    left: -16
  },
  block1: {
    width: 30,
    height: 30,
    marginLeft: widthPercentageToDP(10)
  },
  block3: {
    width: 30,
    height: 30,
    position: "absolute",
    zIndex: 1,
    top: -12
  },
  blockText: {
    fontFamily: "montserrat-bold-english",
    fontSize: 17
  },
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000"
  },
  imageView: { backgroundColor: "#fff" },
  getStartedText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 11,
    textAlign: "center"
  },
  getStartedButton: {
    alignSelf: "center",
    zIndex: 100,
    height: 40,
    width: 110,

    justifyContent: "center"
  },
  imageSlide: {
    height: heightPercentageToDP(100),
    flex: 1,
    alignContent: "center",
    alignSelf: "center"
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    backgroundColor: "transparent"
  },
  background: {
    position: "absolute",
    opacity: 0.2,
    top: "30%",
    alignSelf: "center",
    zIndex: 0
  },
  media: {
    alignSelf: "center",
    height: 100,
    width: 100,
    margin: 15
  },

  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  skipButton: {
    borderRadius: 20,
    borderWidth: 1,
    ...globalStyles.whiteBorderColor,
    height: 40,
    width: 110,
    zIndex: 0
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
    paddingHorizontal: 20
  },
  blockDescription: {
    marginVertical: 20,
    alignSelf: "center"
  },
  heading: {
    fontSize: 20,
    color: "#FFFF",
    fontFamily: "montserrat-bold",
    textAlign: "center",
    marginBottom: 8
  },
  description: {
    fontSize: 16,
    marginTop: 8,
    color: "#FFFF",
    fontFamily: "montserrat-semibold",
    textAlign: "center"
  },
  screen1innerView: {
    flexGrow: 1,
    alignContent: "center",
    marginVertical: 10,
    width: 120,
    marginHorizontal: 10
  },
  screen1Container: {
    backgroundColor: "rgba(0,0,0,0.15)",
    width: 90,
    height: 90,
    display: "flex",
    justifyContent: "center",
    borderRadius: 26,
    alignSelf: "center",
    marginBottom: 7
  },
  slide1Title: {
    color: "#FFF",
    fontSize: 17,
    textAlign: "center",
    textTransform: "uppercase"
  },
  graphImage: {
    height: heightPercentageToDP(30),
    width: widthPercentageToDP(100)
  },
  screen2OuterView: {
    display: "flex",
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.55)",
    paddingHorizontal: 25,
    marginTop: -15
  },
  bsnView: {
    alignSelf: "flex-start"
  },
  bsnBtnView: {
    alignSelf: "flex-start",
    zIndex: 2,
    elevation: 1
  },
  lowerBtn: { width: 46, height: 46 },
  mainView: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20
  },
  paginationContainerStyle: {
    paddingVertical: 5,
    bottom: heightPercentageToDP(5),
    left: widthPercentageToDP(18)
  },
  paginationDotStyle: {
    borderRadius: 7,
    height: 14,
    marginHorizontal: -5,
    width: 14
  }
});

export default styles;
