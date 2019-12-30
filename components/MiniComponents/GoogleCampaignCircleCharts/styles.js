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
    justifyContent: "center",
    alignItems: "center"
  },
  campaignInfoCard: {
    flexDirection: "row",
    top: 10,
    flex: 3
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
  adPerformanceLowerButton: {
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    borderRadius: 30
  },
  subtext: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#fff"
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 10,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
    alignSelf: "flex-start"
  },
  metricsStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 3,
    marginRight: 10,
    backgroundColor: "#0004",
    width: 160,
    borderRadius: 20,
    height: 50
  },
  metricsCardStyle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
    backgroundColor: "#0000",
    borderRadius: 20
  },
  metricIcon: {
    marginRight: 10
  },
  metricView: {
    display: "flex"
  },
  metricText: {
    color: "#fff",
    fontSize: 12,
    textAlign: "left"
  },
  numbers: {
    textAlign: "left",
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    fontSize: 16 / PixelRatio.getFontScale(),
    textAlign: "left"
  },
  metricRow: {
    flexDirection: "row",
    left: 10
  }
});

export default styles;
