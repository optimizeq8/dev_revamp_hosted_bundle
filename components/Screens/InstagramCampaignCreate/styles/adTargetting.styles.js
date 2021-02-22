import { StyleSheet, Platform, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
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
    // ...StyleSheet.absoluteFillObject,
    // backgroundColor: "rgba(0,0,0,0.75)"
  },
  mainContainer: {
    // backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backgroundColor: "#0000",
  },
  container: {
    // borderTopRightRadius: RFValue(15, 414),
    // borderTopLeftRadius: RFValue(15, 414),
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
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7 / PixelRatio.getFontScale(), 414),
    paddingVertical: RFValue(5, 414),
    paddingHorizontal: RFValue(2.5, 414),
    textAlign: "left",
    // textTransform: "uppercase",
  },
  moneyInputContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: RFValue(7.5, 414),
    alignSelf: "center",
    justifyContent: "space-around",
    paddingVertical: RFValue(5, 414),
  },
  budget: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: RFValue(12.5 / PixelRatio.getFontScale(), 414),
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%",
  },
  moreOptionsText: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    bottom: RFValue(5, 414),
  },
  budgetInstructionText: {
    color: "#fff",
    fontSize: RFValue(5.5, 414),
    alignSelf: "center",
    paddingHorizontal: RFValue(10, 414),
  },
  sliderContainer: {
    marginHorizontal: RFValue(20, 414),
    width: "100%",
    alignSelf: "center",
    paddingVertical: RFValue(5, 414),
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: RFValue(20, 414),
  },
  budgetSliderText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    paddingBottom: RFValue(5, 414),
  },
  slider: {
    width: "100%",
    height: RFValue(10, 414),
  },
  sliderPlaceHolder: {
    height: RFValue(37.5, 414),
    justifyContent: "center",
    paddingHorizontal: RFValue(10, 414),
  },
  targetList: {
    flexDirection: "column",
    paddingBottom: RFValue(20, 414),
    height: "50%",
    marginHorizontal: RFValue(15, 414),
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginVertical: RFValue(4, 414),
    backgroundColor: "#fff",
    borderRadius: RFValue(25, 414),
    paddingLeft: RFValue(5, 414),
    paddingVertical: RFValue(2.5, 414),
  },
  icon: {
    alignSelf: "center",
  },

  chart: {
    // bottom: 0,
    // width: widthPercentageToDP(25)
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "center",
    paddingLeft: RFValue(5, 414),
    height: RFValue(135, 414),
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    bottom: RFValue(40, 414),
    position: "absolute",
  },
  chartText: {
    color: globalColors.rum,
    textAlign: "left",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8.5, 414),
  },
  chartTextNum: {
    color: globalColors.rum,
    fontFamily: "montserrat-regular",
    fontSize: RFValue(8, 414),
    textAlign: "left",
  },
  chartItems: {
    flexDirection: "row",
    width: "80%",
  },
  reachBarLowerButton: {
    width: RFValue(27.5, 414),
    height: RFValue(27.5, 414),
    marginRight: widthPercentageToDP(35),
    flex: 0,
  },
  reachPeopleView: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingHorizontal: RFValue(4, 414),
    width: "70%",
  },
  menutext: {
    paddingLeft:
      Platform.OS === "android" && I18nManager.isRTL ? 0 : RFValue(7.5, 414),
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-semibold",
    color: globalColors.purple3,
    textAlign: "left",
    textTransform: "uppercase",
  },
  menudetails: {
    paddingLeft:
      Platform.OS === "android" && I18nManager.isRTL ? 0 : RFValue(7.5, 414),
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    color: globalColors.purple3,
    // lineHeight: 24,
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6.5, 414),
    textAlign: "left",
  },
  flex: {
    flex: 1,
  },
  reachView: {
    // flex: ,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    // width: "100%",
    marginHorizontal: RFValue(15, 414),
  },
  lifetimeBudgetView: {
    backgroundColor: "#FFF",
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: 2,
    borderRadius: RFValue(15, 414),
    alignItems: "center",
  },
  lifetimeBudgetText: {
    fontSize: RFValue(5, 414),
    paddingHorizontal: 0,
    color: globalColors.orange,
    paddingVertical: 3,
  },
  lifetimeBudgetNumber: {
    fontSize: RFValue(7, 414),
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontFamily: "montserrat-bold-english",
  },
  audienceHeading: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    color: globalColors.purple3,
    flex: 1,
    marginHorizontal: RFValue(2.5, 414),
    textTransform: "uppercase",
    textAlign: "left",
  },
  audienceCard: {
    backgroundColor: "#FFF",
    borderRadius: RFValue(15, 414),
    paddingHorizontal: RFValue(7.5, 414),
    paddingTop: RFValue(5, 414),
    paddingBottom: RFValue(5, 414),
    marginVertical: RFValue(2, 414),
  },
  iconDown: {
    color: globalColors.purple,
    right: 2,
    fontSize: RFValue(11, 414),
  },
  interestText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    color: globalColors.purple3,
    flex: 1,
    textTransform: "uppercase",
    textAlign: "left",
    paddingHorizontal: RFValue(5, 414),
  },

  genderOuterView: {
    display: "flex",
    flexDirection: "row",
    padding: RFValue(2.5, 414),
  },
  genderInnerView: {
    borderWidth: 1,
    borderRadius: RFValue(10, 414),
    paddingHorizontal: RFValue(5, 414),
    // paddingVertical: RFValue(2.5, 414),
    marginHorizontal: RFValue(2.5, 414),
    borderColor: globalColors.purple3,
  },
  genderRadioText: {
    color: globalColors.purple3,
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-regular",
    lineHeight: 29,
  },
  genderInnerActiveView: {
    borderColor: globalColors.purple,
    backgroundColor: globalColors.purpleTran,
  },
  genderRadioTextActive: {
    color: globalColors.purple,
  },
  ageText: {
    color: globalColors.purple,
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-regular",
    textAlign: "center",
  },

  toText: {
    marginHorizontal: RFValue(7.5, 414),
    color: globalColors.purple3,
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-regular",
  },

  ageView: {
    borderWidth: 1,
    borderColor: globalColors.purple3,
    borderRadius: RFValue(10, 414),
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: RFValue(3, 414),
    justifyContent: "center",
  },
  ageOuterView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: RFValue(2.5, 414),
    paddingLeft: RFValue(5, 414),
  },
  row: {
    alignItems: "center",
    paddingHorizontal: RFValue(10, 414),
    marginVertical: RFValue(2, 414),
    justifyContent: "space-between",
  },
  walletTextView: {
    flexDirection: "row",
    alignItems: "center",
  },
  dailyBudgetText: {
    paddingHorizontal: RFValue(5, 414),
    textTransform: "capitalize",
  },
  createView: { flexDirection: "row", alignItems: "center" },
  createText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    color: "#9325FF",
  },
  iconAdd: { marginHorizontal: 5 },
});

export default styles;
