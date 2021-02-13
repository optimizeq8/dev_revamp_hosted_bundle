import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  tooltipContainer: { width: "100%" },
  tooltipHeaderText: {
    fontFamily: "montserrat-bold",
    color: globalColors.purple,
    textTransform: "uppercase",
    marginHorizontal: RFValue(4, 414),
    fontSize: RFValue(9, 414),
  },
  tooltipText: {
    fontFamily: "montserrat-regular",
    color: globalColors.rum,
    fontSize: RFValue(8, 414),
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: RFValue(4, 414),
  },
  tooltipTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tooltipButton: {
    backgroundColor: globalColors.purple,
    justifyContent: "center",
    borderRadius: RFValue(10, 414),
    width: "45%",
    height: RFValue(20, 414),
    alignItems: "center",
  },
  tooltipCloseButton: {
    borderRadius: RFValue(25, 414),
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    alignSelf: "flex-end",
    alignItems: "center",
  },
  tooltipButtonText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    fontSize: RFValue(5.5, 414),
  },
  stepContainer: {
    backgroundColor: globalColors.orange,
    borderRadius: RFValue(25, 414),
    width: RFValue(12.5, 414),
    height: RFValue(12.5, 414),
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    color: "#fff",
  },
  closeIcon: {
    fontSize: RFValue(10, 414),
  },
});
