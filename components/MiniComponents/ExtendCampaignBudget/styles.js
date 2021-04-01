import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  extendBudgetContainer: {
    backgroundColor: globalColors.white,
    height: RFValue(160, 414),
    // flex: 1,
    // borderRadius: RFValue(25, 414),
    alignItems: "center",
    // bottom: 0,
    // position: "absolute",
    // width: RFValue(210, 414),
    // padding: RFValue(6, 414),
  },
  extendBudgetTitles: {
    fontSize: RFValue(10, 414),
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
  },
  subHeadings: {
    color: globalColors.gray,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    paddingVertical: RFValue(2.5, 414),
    paddingHorizontal: RFValue(15, 414),
    textAlign: "left",
  },
  lifetimeBudgetNumber: {
    fontSize: RFValue(7, 414),
    paddingHorizontal: 0,
    paddingVertical: 0,
    fontFamily: "montserrat-bold-english",
  },
  lifetimeBudgetView: {
    backgroundColor: "#0001",
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: RFValue(2.5, 414),
    borderRadius: RFValue(15, 414),
    alignItems: "center",
  },
  customAudienceReach: {
    // bottom: RFValue(35, 414),
  },
  lifetimeBudgetText: {
    fontSize: RFValue(5, 414),
    paddingHorizontal: 0,
    color: globalColors.orange,
  },
});
