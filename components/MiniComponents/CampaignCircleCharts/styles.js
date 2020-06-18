import { StyleSheet, PixelRatio } from "react-native";

import { widthPercentageToDP } from "react-native-responsive-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
    justifyContent: "space-between",
    alignSelf: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    height: 50,
  },
  title: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.white,
    alignSelf: "flex-start",
  },
  subtext: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
    textTransform: "uppercase",
    textAlign: "left",
  },
  subtextDetail: {
    fontFamily: "montserrat-bold",
  },
  chart: {
    alignItems: "center",
    paddingHorizontal: 5,
  },
  chartText: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: 10,
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 10,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
    textAlign: "left",
  },
  campaignIcons: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0004",
    marginVertical: 2.5,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 160,
    width: wp(42),
    marginRight: 5,
    height: 50,
  },
  campaignNumbers: {
    paddingHorizontal: 0,
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    fontSize: 15 / PixelRatio.getFontScale(),
    textAlign: "left",
    // paddingHorizontal: 10
  },
  campaignNumbersDetail: {
    fontFamily: "montserrat-regular-english",
    fontSize: 16 / PixelRatio.getFontScale(),
  },
  campaignInfo: {
    flexDirection: "column",
    paddingHorizontal: 10,
    // alignItems: "center"
    // width: wp(40),
    // left: 10
  },
  campaignInfoCard: {
    flex: 1,
    top: 10,
    alignItems: "flex-start",
  },
  campaignCard: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10
  },
  adPerformanceLowerBUtton: {
    width: 35,
    height: 35,
  },
});

export default styles;
