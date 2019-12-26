import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  container: {
    // height: "100%",
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
    top: 5,
    width: "30%",
    alignItems: "center",
    alignSelf: "center"
  },
  mainCard: {
    height: "100%",
    overflow: "hidden",
    borderBottomStartRadius: 30,
    borderBottomEndRadius: 30
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
    fontSize: 16,
    paddingHorizontal: 10
  },
  categoryView: {
    flexDirection: "row",
    padding: 5
    // alignSelf: "flex-start"
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 15,
    paddingVertical: hp("1")
  },

  title: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "left",
    textTransform: "uppercase"
  },
  chartTitle: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 20,
    width: 150
  },
  subtext: {
    fontFamily: "montserrat-light",
    fontSize: 15,
    color: "#fff"
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium-english",
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
    color: "#FF9D00",
    fontSize: 25
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
    justifyContent: "center",
    overflow: "hidden",
    backgroundColor: "#0004",
    width: "100%",
    height: "85%",
    borderRadius: 40
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
    flex: 1,
    elevation: 10,
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    top: 10
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
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "space-between",
    borderRadius: 30
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
    // top: 50,
    flex: 1
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
    height: 35,
    top: 20
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
  campaignMediaAndInfo: {
    flexDirection: "row",
    width: "100%",
    height: "40%",
    marginVertical: 10,
    justifyContent: "space-evenly"
  },
  titleHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%"
  },
  targetingContainer: {
    flexDirection: "column",
    backgroundColor: "#0005",
    height: "85%",
    width: "100%",
    borderRadius: 40,
    justifyContent: "center",
    padding: 10
  },
  storyOrCollectionStyle: {
    borderRadius: 40,
    width: "100%",
    height: "75%",
    position: "absolute",
    top: "16%",
    left: "7%",
    opacity: 0.4
  },
  metricsStyle: {
    flexDirection: "row",
    alignItems: "center",
    // flex: 1,
    paddingHorizontal: 20,
    marginVertical: 3,
    marginRight: 10,
    backgroundColor: "#0004",
    width: 160,
    borderRadius: 20,
    height: 50
    // padding: "3%"
  },
  chartChoices: {
    justifyContent: "center"
  },
  chartChoiceButtons: {
    width: "35%"
  },
  chartChoiceText: {
    fontSize: 12 / PixelRatio.getFontScale()
  },
  pauseModalTitle: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    textTransform: "uppercase",
    fontSize: 20,
    textAlign: "center"
  },
  mediaPreviewLowerButton: {
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    borderRadius: 25
  }
});

export default styles;
