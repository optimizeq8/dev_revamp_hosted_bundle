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
    top: 10,
    alignItems: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 50,
  },
  title: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.white,
    alignSelf: "flex-start",
  },
  adPerformanceLowerButton: {
    width: 35,
    height: 35,
  },
  subtext: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#fff",
    textAlign: "left",
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 10,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
    alignSelf: "flex-start",
  },
  metricsStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 3,
    marginRight: 10,
    backgroundColor: "#0004",
    width: widthPercentageToDP(42),
    borderRadius: 20,
    height: 50,
  },
  metricsCardStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    backgroundColor: "#0000",
    borderRadius: 20,
  },
  metricIcon: {
    marginRight: 10,
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
    marginVertical: 5,
  },
});

export default styles;
