import { StyleSheet, PixelRatio } from "react-native";

import { widthPercentageToDP } from "react-native-responsive-screen";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  campaignInfoStyle: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
    // height: "40%"
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 50
  },
  title: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.white,
    alignSelf: "flex-start"
  },
  subtext: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#fff",
    textAlign: "left"
  },
  chart: {
    alignItems: "center",
    paddingHorizontal: 5
  },
  chartText: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: 10
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 10,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff"
  },
  campaignIcons: {
    // flexDirection: "row",
    // alignItems: "center"
    // backgroundColor: "#0004",
    // marginVertical: 2.5,
    // borderRadius: 20
    // padding: "3%"
  },
  campaignNumbers: {
    paddingHorizontal: 0,
    paddingTop: 10
  },
  campaignInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: wp(40),
    left: 10
  },
  campaignInfoCard: {
    flexDirection: "row",
    top: 10,
    flex: 3
  },
  campaignCard: {
    flexDirection: "row",
    alignItems: "center"
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
  metricsCardStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    // marginRight: 40,
    backgroundColor: "#0000",
    // width: 170,
    borderRadius: 20
    // height: 53,
    // padding: "3%"
  },
  adPerformanceLowerButton: {
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    borderRadius: 30
  },
  numbers: {
    textAlign: "left",
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    fontSize: 16 / PixelRatio.getFontScale()
  },
  metricText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "left"
  },
  metricView: {
    display: "flex"
  },
  metricIcon: { marginRight: 10 }
});

export default styles;
