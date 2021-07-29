import { StyleSheet, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  contentContainerStyle1: {
    backgroundColor: "rgba(0,0,0,0.6)",
    // marginHorizontal: 20
  },
  contentContainerStyle2: {
    flex: 1,
    marginVertical: RFValue(10, 414),
  },
  contentStyle2: {
    marginHorizontal: RFValue(10, 414),
  },
  videoView: {
    height: "100%",
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 30,
    // backgroundColor: "rgba(0,0,0,0.15)"
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  budgetView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: RFValue(6, 414),
  },
  budgetText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9, 414),
    color: "#FFFFFF",
    textTransform: "uppercase",
  },
  budgetAmountView: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
  budgetDollarText: {
    color: "#FFFFFF",
    fontFamily: "montserrat-medium",
    fontSize: RFValue(7, 414),
  },
  budgetAmountText: {
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(12, 414),
  },
  contentContainerStyle: {
    paddingHorizontal: RFValue(2.5, 414),
  },
  footerBlock: {
    paddingBottom: RFValue(5, 414),
    margin: 0,
    borderTopWidth: 0,
    // height: 100,
    backgroundColor: "#FFF",
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    marginLeft: 0,
    marginRight: 0,
    width: "100%",
  },
  optimizeFeesPercentange: {
    color: "#C6C6C6",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    paddingRight: 2,
  },
  safeAreaView: {
    flex: 1,
    // backgroundColor: "rgba(0,0,0,0.75)"
    backgroundColor: globalColors.bluegem,
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: RFValue(24, 414) },
  container: {
    height: "100%",
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    display: "flex",
    overflow: "hidden",
    justifyContent: "space-between",
  },
  media: {
    alignSelf: "center",
    height: 120,
    width: 120,
    margin: 15,
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50,
  },

  mainCard: {
    // top: 20,
    // borderColor: "#FF9D00",
    backgroundColor: "#FF9D00",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: RFValue(22.5, 414),
    width: widthPercentageToDP(50),
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 30,
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: RFValue(5, 414),
    fontFamily: "montserrat-medium",
    fontSize: RFValue(7, 414),
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(5, 414),
  },

  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
  },
  bottomCardBlock1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingRight: RFValue(20, 414),
    paddingLeft: RFValue(27.5, 414),
    paddingTop: RFValue(7.5, 414),
    backgroundColor: "#FFF",
    borderTopLeftRadius: RFValue(17.5, 414),
    borderTopRightRadius: RFValue(17.5, 414),
    paddingBottom: RFValue(10, 414),
  },
  dollarAmountContainer: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignSelf: "flex-start",
    // alignItems: 'baseline',
  },
  dollarAmountText: {
    fontSize: RFValue(7.5, 414),
    color: "#FF9D00",
  },
  kdAmountContainer: {
    flexDirection: "row-reverse",
    alignSelf: "flex-start",
    // alignItems: 'center',
    paddingTop: 2,
  },
  kdText: {
    fontSize: RFValue(5.5, 414),
    color: "#C6C6C6",
    fontFamily: "montserrat-bold-english",
  },
  kdAmountText: {
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-bold-english",
    paddingLeft: 4,
    color: "#C6C6C6",
  },
  optimizeFeesTextContainer: {
    flexDirection: "row",
    paddingTop: 10,
    // width: '70%',
  },
  optimizeFeesText: {
    color: "#C6C6C6",
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-light",
    // textAlign: 'left',
  },
  payNowText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
    //   paddingBottom: 3
  },
  money: {
    color: "#FF9D00",
    // textAlign: 'center',
    fontSize: RFValue(10.5, 414),
    fontFamily: "montserrat-bold-english",
    // paddingTop: 3
  },
  feesAmountText: {
    color: "#fff",
    textAlign: "left",
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-bold",
  },
});

export default styles;
