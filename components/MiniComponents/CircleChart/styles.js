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
    fontSize: 12,
    textAlign: "center",

    textTransform: "uppercase",
  },
  chartSubtext: {
    textTransform: "uppercase",
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-bold",
    textAlign: "center",
  },
  chartBudgetSubtext: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-regular",
    textAlign: "center",
  },
  innerStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
});
