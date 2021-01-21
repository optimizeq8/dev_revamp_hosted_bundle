import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  tooltipContainer: { width: "100%" },
  tooltipHeaderText: {
    fontFamily: "montserrat-bold",
    color: globalColors.purple,
    textTransform: "uppercase",
    marginHorizontal: 8,
  },
  tooltipText: {
    fontFamily: "montserrat-regular",
    color: globalColors.rum,
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
  },
  tooltipTextContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tooltipButton: {
    backgroundColor: globalColors.purple,
    justifyContent: "center",
    borderRadius: 20,
    width: "45%",
    height: 40,
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
    backgroundColor: globalColors.orange,
    borderRadius: 50,
    width: 25,
    height: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumberText: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    color: "#fff",
  },
});
