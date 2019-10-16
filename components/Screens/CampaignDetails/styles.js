import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#0000"
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
    borderColor: "transparent",
    backgroundColor: "transparent",
    flex: 1,
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
    fontSize: 15,
    paddingVertical: hp("1")
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
    color: "#FF9D00",
    fontSize: 20,
    bottom: 5
  },
  gender: {
    // ...StyleSheet.absoluteFillObject,
    left: 17,

    top: 5,

    transform: [{ rotate: "-45deg" }]
  },
  optionalTargets: { flexDirection: "column", marginBottom: 10 },
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
    bottom: 30
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
    ...StyleSheet.absoluteFillObject,
    left: wp("26%"),
    top: hp("1.7%"),
    zIndex: 2
  },
  handlerText: {
    textAlign: "center",
    color: "#fff",
    paddingTop: I18nManager.isRTL ? 0 : 25,
    paddingBottom: I18nManager.isRTL ? 0 : 20,
    fontFamily: "montserrat-medium",
    fontSize: 18,
    bottom: I18nManager.isRTL ? -12 : 5
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
    borderRadius: 30
  },
  choiceButtons: {
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
    padding: 10
  },
  switchButtonText: {
    fontSize: 10,
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center"
  },
  placeHolderChart: {
    position: "absolute",
    zIndex: 100,
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
  }
});

export default styles;
