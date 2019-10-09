import { StyleSheet, Platform, PixelRatio, I18nManager } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.75)"
  },
  mainContainer: {
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: "#0000"
  },
  container: {
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    backgroundColor: "#0000",
    // marginTop: hp(2),
    overflow: "hidden",
    width: "100%",
    height: "100%",
    flex: 1
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  imageBackgroundViewWrapper: {
    position: "absolute",
    // left: -60,
    width: "100%",
    height: "100%",
    overflow: "hidden"
  },
  videoBackgroundViewWrapper: {
    width: "100%",
    height: "100%"
  },
  contentContainer: {
    flex: 1
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingVertical: 10
  },
  moneyInputContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "space-around",
    paddingVertical: 10
  },
  budget: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 25 / PixelRatio.getFontScale(),
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%"
  },
  moreOptionsText: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    paddingBottom: 30
  },
  budgetInstructionText: {
    color: "#fff",
    fontSize: 11,
    alignSelf: "center",
    paddingHorizontal: 20
  },
  sliderContainer: {
    marginHorizontal: 40,
    width: "100%",
    alignSelf: "center",
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 40
  },
  budgetSliderText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    paddingBottom: 10
  },
  slider: {
    width: "100%",
    height: 20
  },
  sliderPlaceHolder: {
    height: 75,
    justifyContent: "center"
  },
  targetList: {
    flexDirection: "column",
    height: "60%",
    marginHorizontal: 40
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8
  },
  icon: {
    alignSelf: "center"
  },

  chart: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 0,
    left: 0,
    top: -20,
    right: 0
  },
  bottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
  },
  chartText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: 12
  },
  chartTextNum: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    textAlign: "center"
  },
  chartItems: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    paddingVertical: Platform.OS === "android" ? 0 : 10
  },
  menutext: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    fontSize: 13,
    fontFamily: "montserrat-light",
    color: "#fff",
    textAlign: "left"
  },
  menudetails: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    color: "#fff",
    fontFamily: "montserrat-light-english",
    fontSize: 11,
    textAlign: "left"
  },
  flex: {
    flex: 1
  }
});

export default styles;
