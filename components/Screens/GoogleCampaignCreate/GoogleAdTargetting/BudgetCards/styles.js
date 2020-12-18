import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { globalColors } from "../../../../../GlobalStyles";
export default StyleSheet.create({
  scrollContainerStyle: {
    alignItems: "center",
    flex: 0,
    paddingHorizontal: 20,
    // paddingTop: 5,
  },
  budgetCardsStyle: {},
  budgetCardStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: globalColors.white,
    borderRadius: 28,
    borderColor: globalColors.purple,
    borderWidth: 2,
    // height: 35,
    marginHorizontal: 3,
    // width: 105,
    paddingVertical: 7,
    paddingHorizontal: 30,
  },
  budgetTextStyle: {
    color: globalColors.purple3,
    fontFamily: "montserrat-bold",
    fontSize: 16,
  },
  activeBudgetTextStyle: {
    color: globalColors.purple,
  },
  budget: {
    alignSelf: "center",
    color: globalColors.purple3,
    fontSize: 14 / PixelRatio.getFontScale(),
    fontFamily: "montserrat-bold",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%",
  },
  recIcon: {
    position: "absolute",
    left: I18nManager.isRTL ? "65%" : "15%",
    marginTop: I18nManager.isRTL ? 0 : -4,
    backgroundColor: globalColors.green,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  recommendText: {
    fontSize: 9,
    color: globalColors.white,
    fontFamily: "montserrat-bold",
  },
});
