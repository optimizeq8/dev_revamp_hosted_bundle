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
    marginHorizontal: 3,
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
    left: I18nManager.isRTL ? "65%" : "61%",
    top: I18nManager.isRTL ? 0 : 4,
    backgroundColor: globalColors.green,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendText: {
    fontSize: 9,
    color: globalColors.white,
    fontFamily: "montserrat-bold",
  },
});
