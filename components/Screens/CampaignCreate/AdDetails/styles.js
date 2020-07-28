import { StyleSheet, Platform, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    flex: 1,
    backgroundColor: "#0000",
  },
  mainContainer: {
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: "#0000",
  },
  container: {
    // borderTopRightRadius: 30,
    // borderTopLeftRadius: 30,
    backgroundColor: "#0000",
    // marginTop: hp(2),
    overflow: "hidden",
    width: "100%",
    height: "100%",
    flex: 1,
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  imageBackgroundViewWrapper: {
    position: "absolute",
    // left: -60,
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  videoBackgroundViewWrapper: {
    width: "100%",
    height: "100%",
  },
  contentContainer: {
    flex: 1,
  },
  subHeadings: {
    color: globalColors.gray,
    fontFamily: "montserrat-bold",
    fontSize: 18,
    paddingVertical: 10,
    paddingHorizontal: 30,
    textAlign: "left",
  },
  moneyInputContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  budget: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 25 / PixelRatio.getFontScale(),
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%",
  },
  moreOptionsText: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    bottom: 20,
  },
  budgetInstructionText: {
    color: "#fff",
    fontSize: 11,
    alignSelf: "center",
    paddingHorizontal: 20,
  },
  sliderContainer: {
    marginHorizontal: 40,
    width: "100%",
    alignSelf: "center",
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 40,
  },
  budgetSliderText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    paddingBottom: 10,
  },
  slider: {
    width: "100%",
    height: 20,
  },
  sliderPlaceHolder: {
    height: 75,
    justifyContent: "center",
  },
  targetList: {
    flexDirection: "column",
    paddingBottom: 40,
    height: "50%",
    marginHorizontal: 30,
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  icon: {
    alignSelf: "center",
  },

  chart: {
    // bottom: 0,
    // width: widthPercentageToDP(25)
  },
  bottom: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    bottom: "15%",
    marginLeft: 25,
    width: "100%",
    // marginHorizontal: 30
    paddingBottom: 15,
  },
  chartText: {
    color: "#fff",
    textAlign: "left",
    fontFamily: "montserrat-bold",
    fontSize: 17,
  },
  chartTextNum: {
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 16,
    textAlign: "left",
  },
  chartItems: {
    flexDirection: "row",
  },
  reachBarLowerButton: {
    width: 55,
    height: 55,
    marginRight: widthPercentageToDP(35),
    flex: 0,
  },
  reachPeopleView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  menutext: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    fontSize: 13,
    fontFamily: "montserrat-bold",
    color: globalColors.gray,
    textAlign: "left",
    textTransform: "uppercase",
  },
  menudetails: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    color: globalColors.gray,

    fontFamily: "montserrat-regular",
    fontSize: 11,
    textAlign: "left",
  },
  flex: {
    flex: 1,
  },
  menuComponentStyle: { top: 0 },
});

export default styles;
