import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  repeatBudgetContainer: {
    backgroundColor: globalColors.white,
    height: RFValue(160, 414),
    borderRadius: 50,
    alignItems: "center",
    position: "absolute",
    width: RFValue(210, 414),
    padding: 12,
  },
  repeatBudgetTitles: {
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
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 30,
    alignItems: "center",
  },
  customAudienceReach: {
    bottom: 10,
  },
  lifetimeBudgetText: {
    fontSize: 10,
    paddingHorizontal: 0,
    color: globalColors.orange,
  },
});
