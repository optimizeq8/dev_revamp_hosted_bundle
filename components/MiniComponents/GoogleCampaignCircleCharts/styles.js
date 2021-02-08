import { StyleSheet, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  campaignInfoStyle: {
    justifyContent: "center",
    alignItems: "center",
  },
  campaignInfoCard: {
    flex: 1,
    top: RFValue(5, 414),
    alignItems: "flex-start",
  },
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
  adPerformanceLowerButton: {
    width: RFValue(17.5, 414),
    height: RFValue(17.5, 414),
  },
  subtext: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    color: "#fff",
    textAlign: "left",
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: RFValue(5, 414),
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    color: "#fff",
    alignSelf: "flex-start",
  },
  metricsStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10, 414),
    marginVertical: RFValue(1.5, 414),
    marginRight: RFValue(5, 414),
    backgroundColor: "#0004",
    width: widthPercentageToDP(42),
    borderRadius: RFValue(10, 414),
    height: RFValue(25, 414),
  },
  metricsCardStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: RFValue(1.5, 414),
    backgroundColor: "#0000",
    borderRadius: RFValue(10, 414),
  },
  metricIcon: {
    marginRight: RFValue(5, 414),
  },
  metricView: {
    display: "flex",
  },
  metricText: {
    color: "#fff",
    fontSize: RFValue(6, 414),
    textAlign: "left",
    textTransform: "uppercase",
  },
  numbers: {
    textAlign: "left",
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(8, 414),
    textAlign: "left",
  },
  metricRow: {
    flexDirection: "row",
    marginVertical: RFValue(2.5, 414),
  },
});

export default styles;
