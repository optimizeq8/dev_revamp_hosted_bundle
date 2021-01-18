import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  tooltipContainer: { width: "100%" },
  tooltipText: {
    fontFamily: "montserrat-regular",
    color: globalColors.rum,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  tooltipButton: {
    backgroundColor: globalColors.darkOrange,
    justifyContent: "center",
    borderRadius: 20,
    width: "45%",
    height: 30,
    alignItems: "center",
  },
  tooltipCloseButton: {
    borderRadius: 50,
    width: 30,
    height: 30,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  tooltipButtonText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    fontSize: 11,
  },
  stepContainer: {
    backgroundColor: globalColors.green,
    borderRadius: 50,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontFamily: "montserrat-bold",
    fontSize: 11,
    color: "#fff",
  },
});
