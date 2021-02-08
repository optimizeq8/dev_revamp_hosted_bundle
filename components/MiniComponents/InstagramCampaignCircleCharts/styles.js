import { StyleSheet, PixelRatio } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  campaignInfoStyle: {},
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-start",
    alignItems: "center",
    width: "100%",
    height: RFValue(25, 414),
  },
  title: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    color: globalColors.white,
    alignSelf: "flex-start",
  },
  subtext: {
    fontFamily: "montserrat-regular",
    // fontSize: RFValue(6, 414),
    fontSize: RFValue(6, 414),
    color: "#fff",
    textTransform: "uppercase",
    textAlign: "left",
  },
  subtextDetail: {
    fontFamily: "montserrat-bold",
  },
  chart: {
    alignItems: "center",
    paddingHorizontal: RFValue(2.5, 414),
  },
  chartText: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: RFValue(8, 414),
    marginLeft: RFValue(5, 414),
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: RFValue(5, 414),
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    color: "#fff",
    textAlign: "left",
  },
  campaignIcons: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0004",
    marginVertical: 2.5,
    borderRadius: RFValue(10, 414),
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(5, 414),
    width: RFValue(80, 414),
    height: RFValue(25, 414),
  },
  campaignNumbers: {
    paddingHorizontal: 0,
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    // fontSize: 15 / PixelRatio.getFontScale(),
    fontSize: RFValue(7.5, 414),
    textAlign: "left",
    // paddingHorizontal: 10
  },
  campaignNumbersDetail: {
    fontFamily: "montserrat-regular-english",
    // fontSize: 16 / PixelRatio.getFontScale(),
    fontSize: RFValue(8, 414),
  },
  campaignInfo: {
    flexDirection: "column",
    paddingHorizontal: RFValue(5, 414),
    // alignItems: "center"
    // width: wp(40),
    // left: 10
  },
  campaignInfoCard: {
    flex: 1,
    top: RFValue(5, 414),
    alignItems: "flex-start",
  },
  campaignCard: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10
  },
  adPerformanceLowerBUtton: {
    width: RFValue(17.5, 414),
    height: RFValue(17.5, 414),
  },
});

export default styles;
