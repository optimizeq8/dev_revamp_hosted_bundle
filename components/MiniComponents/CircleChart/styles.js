import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";
export default StyleSheet.create({
  chart: {
    // marginHorizontal: 10
    // top: 15
  },
  chartText: {
    color: globalColors.orange,
    fontFamily: "montserrat-medium",
    fontSize: 14
  },
  chartSubtext: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-bold"
  },
  chartBudgetSubtext: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-regular"
  },
  innerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "70%"
  }
});
