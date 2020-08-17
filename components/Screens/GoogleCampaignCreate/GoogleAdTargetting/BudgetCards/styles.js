import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { globalColors } from "../../../../../GlobalStyles";
export default StyleSheet.create({
  scrollContainerStyle: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 5,
  },
  budgetCardsStyle: { alignSelf: "center" },
  budgetCardStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0003",
    borderRadius: 12,
    borderColor: globalColors.orange,
    borderWidth: 2.5,
    height: 50,
    marginHorizontal: 5,
    width: 105,
  },
  budgetTextStyle: {
    color: globalColors.orange,
    fontFamily: "montserrat-bold",
    fontSize: 18,
  },
  budget: {
    alignSelf: "center",
    color: globalColors.orange,
    fontSize: 19 / PixelRatio.getFontScale(),
    fontFamily: "montserrat-bold",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%",
  },
  recIcon: {
    position: "absolute",
    left: I18nManager.isRTL ? "54%" : "73%",
    bottom: "70%",
    backgroundColor: globalColors.green,
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
