import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
export default StyleSheet.create({
  chart: {
    // marginHorizontal: 10
    // top: 15
  },
  chartText: {
    color: globalColors.orange,
    fontFamily: "montserrat-medium",
    fontSize: RFValue(6, 414),
    textAlign: "center",

    textTransform: "uppercase",
  },
  chartSubtext: {
    textTransform: "uppercase",
    // fontSize: RFValue(6, 414),
    fontSize: RFValue(6, 414),
    color: "#fff",
    fontFamily: "montserrat-bold",
    textAlign: "center",
  },
  chartBudgetSubtext: {
    fontSize: RFValue(6, 414),
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
