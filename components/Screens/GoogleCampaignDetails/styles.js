import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000"
  },
  media: {
    alignSelf: "center",
    height: hp("5"),
    width: hp("5")
  },
  reviewtext: {
    fontFamily: "montserrat-medium",
    fontSize: 13,
    padding: 3,
    color: "#fff",
    textAlign: "center"
  },
  adStatus: {
    borderRadius: 16,
    marginBottom: 5,
    paddingHorizontal: 10,
    marginTop: 5,
    width: "30%",
    alignItems: "center",
    alignSelf: "center"
  },
  mainCard: {
    borderColor: "transparent",
    backgroundColor: "transparent",
    paddingBottom: hp(15),
    flexGrow: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: -10,
    zIndex: -1
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttontext: {
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center"
  },

  button: {
    alignSelf: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: hp("5%"),
    elevation: 0
  },

  categories: {
    textAlign: "left",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-bold",
    fontSize: 13,
    paddingHorizontal: 10
  },
  categoryView: {
    flexDirection: "row",
    alignSelf: "flex-start"
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 18
    // paddingRight: 30
    // paddingVertical: hp("1")
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 19,
    alignSelf: "center"
  },
  chartTitle: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 20,
    width: 150
  },
  subtext: {
    fontFamily: "montserrat-light-english",
    fontSize: 14,
    paddingTop: 5,
    color: "#fff"
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingHorizontal: 10
  },
  toggleSpace: {
    top: hp("2"),
    height: hp("10")
  },
  icon: {
    flexDirection: "column",
    alignSelf: "center",
    color: "#FF790A",
    fontSize: 33
    // bottom: 5
  },
  gender: {
    // ...StyleSheet.absoluteFillObject,
    left: 17,

    top: 5,

    transform: [{ rotate: "-45deg" }]
  },
  optionalTargets: {
    flexDirection: "column",
    marginBottom: 10
    // alignSelf: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000"
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  toggleStyle: {
    marginTop: 0,
    width: wp("28"),
    height: hp("4"),
    borderRadius: 25,
    padding: 0
  },
  circleStyle: {
    width: 25,
    height: 25,
    borderRadius: 19
  },

  btnClose: {
    position: "absolute",
    top: hp("5%"),
    left: wp("10%"),
    height: 100,
    width: 100
  },
  BlurView: {
    height: "100%",
    paddingTop: hp("15%")
  },
  pauseDes: {
    fontFamily: "montserrat-light",
    fontSize: 14,

    marginVertical: 20,
    padding: 20
  },
  dragHandler: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  bottomContainer: {
    width: wp("100"),
    // height: 200,
    elevation: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    bottom: 10
  },
  tab: {
    // position: "absolute",
    backgroundColor: "#000",
    top: 15,
    alignSelf: "center",
    width: wp("63%"),
    borderRadius: 30,
    paddingBottom: 20
  },
  handlerIcon: {
    position: "absolute",
    left: wp("26%"),
    top: -10,
    zIndex: 2
  },
  handlerText: {
    textAlign: "center",
    color: "#fff",
    paddingTop: I18nManager.isRTL ? 0 : 25,
    paddingBottom: I18nManager.isRTL ? 0 : 20,
    fontFamily: "montserrat-medium",
    fontSize: 18,
    bottom: I18nManager.isRTL ? -5 : 5
    // zIndex: 1
  },
  boxStats: {
    top: 30,
    width: 140,
    paddingVertical: "4%",
    paddingHorizontal: "5%",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 15
  },
  wideBoxStat: {
    width: "83%",
    alignSelf: "center",
    paddingVertical: "3%",
    top: "18%"
  },
  stats: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    alignSelf: "center"
  },
  editButton: {
    position: "absolute",
    left: wp(85),
    top: hp(10),
    fontFamily: "montserrat-regular"
  },
  switchButtonTex: {
    fontFamily: "montserrat-medium",
    fontSize: 10,
    color: "#fff",
    top: 7,
    textAlign: "center"
  },
  switchCircle: {
    width: wp("13"),
    height: hp("3.8"),
    borderRadius: 25,
    flexDirection: "column",
    justifyContent: "center"
  },
  statusText: {
    fontFamily: "montserrat-medium",
    fontSize: 10,
    paddingTop: 5,
    color: "#fff",
    textAlign: "center"
  },
  choicesStyles: {
    elevation: 11,
    zIndex: 11,
    position: "absolute",
    width: "80%",
    backgroundColor: "rgba(255,255,255,0.3)",
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    borderRadius: 30,
    flex: 1
  },
  choiceButtons: {
    elevation: 0,
    borderRadius: 30,
    width: 100,
    justifyContent: "center"
  },
  choiceText: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    textAlign: "center"
  },
  boxStatsRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    top: hp(4)
  },
  mainMetrics: {
    top: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10
  },
  statusButtonsText: {
    fontFamily: "montserrat-medium",
    color: "#fff",
    backgroundColor: "transparent"
  },
  statusButtons: {
    borderRadius: 10,
    borderColor: globalColors.orange,
    borderWidth: 0.5,
    alignSelf: "center",
    marginVertical: 5,
    padding: 10,
    width: "40%",
    justifyContent: "center"
  },
  switchButtonText: {
    fontSize: 10,
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center"
  },
  placeHolderChart: {
    position: "absolute",
    zIndex: 10,
    width: wp(90),
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15
  },
  ScrollChartArea: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.4)",
    height: 35
  },
  placeHolderChartText: { fontFamily: "montserrat-medium", color: "#fff" },
  dot: {
    top: 10,
    width: 10,
    height: 10,
    marginHorizontal: 10,
    borderRadius: 50,
    backgroundColor: globalColors.orange
  },
  reviewButton: {
    alignSelf: "center",
    borderRadius: 12,
    top: "10%",
    padding: 20,
    backgroundColor: globalColors.orange
  },
  iconView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: wp(100),
    paddingBottom: 10
  },
  googleIcon: {
    alignSelf: "center",
    marginTop: 20
  },
  campaignInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    // width: wp(40)
    // left: 10
    paddingLeft: 10
  },
  campaignIcons: {
    top: 10,
    // left: 10,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingLeft: 10
  },
  campaignNumbers: {
    top: 6,
    fontFamily: "montserrat-medium",
    right: 10
  },
  chartContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  campaignMediaAndInfo: {
    flexDirection: "row",
    width: "100%",
    height: 250,
    marginTop: 10,
    marginBottom: hp(8),
    justifyContent: "space-evenly"
  },
  targetingContainer: {
    flexDirection: "column",
    backgroundColor: "#0005",
    width: "100%",
    borderRadius: 40,
    justifyContent: "center",
    // paddingVertical: 20,
    paddingBottom: 30,
    paddingHorizontal: 20
  },
  keyword: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#FFF"
  },
  keywordView: {
    marginVertical: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#FF790A",
    borderRadius: 20
  },
  subHeading: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    color: "#FFF",
    paddingVertical: 20,
    textAlign: "left"
  },
  subHeadingView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
    // paddingHorizontal: 20
  },
  placeholderView: {
    margin: 5
  },
  keywordContainer: { width: "40%" },
  keywordLowerButton: {
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    borderRadius: 20
  },
  chart: {
    // bottom: 0
  },
  bottom: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: 0,
    marginLeft: 25,
    width: "100%",
    // marginHorizontal: 30
    paddingBottom: 15
  },
  chartText: {
    color: "#fff",
    textAlign: "left",
    fontFamily: "montserrat-bold",
    fontSize: 17
  },
  chartTextNum: {
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 16,
    textAlign: "left"
  },
  chartItems: {
    flexDirection: "row"
  },
  reachBarLowerButton: {
    backgroundColor: "#ff9d00",
    borderRadius: 50,
    paddingLeft: 5,
    // padding: 5,
    width: 55,
    height: 55,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginRight: wp(35),
    flex: 0
  },
  reachPeopleView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 8
  },
  flex: {
    flex: 1
  },
  customButtonStyle: {
    width: 160,
    height: 50,
    alignSelf: "flex-end"
  },
  customButtonText: {
    fontSize: 14
    // paddingVertical: 5
  },
  reviewStatusText: {
    textAlign: "left",
    paddingVertical: 3,
    fontSize: 12,
    fontFamily: "montserrat-regular",
    color: "#FFF"
  },
  rejectedReasonContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    flexDirection: "column",
    // alignItems: "center",
    // height: 80,
    width: "100%",
    // justifyContent: "space-evenly",
    marginVertical: 10,
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  hereReasonsText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: "#FFF"
  },
  adRejectedTitle: {
    fontSize: 18,
    fontFamily: "montserrat-bold",
    color: "#EA514B",
    paddingVertical: 5
  },
  rejectedHeader: {
    alignItems: "center",
    marginHorizontal: 20
  },
  reviewStatusReason: {
    fontSize: 13,
    fontFamily: "montserrat-bold",
    color: "#FF9D00",
    textAlign: "left"
  },
  infoButton: { alignSelf: "flex-end" },
  xAxisStyle: {
    position: "absolute",
    backgroundColor: "#000",
    width: "15%"
  },
  noKeywordsView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%"
  }
});

export default styles;
