import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../../../GlobalStyles";
export default StyleSheet.create({
  scrollContainerStyle: {
    alignItems: "center",
    paddingHorizontal: 20
  },
  budgetCardsStyle: { alignSelf: "center" },
  budgetCardStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff3",
    borderRadius: 12,
    borderColor: globalColors.orange,
    borderWidth: 2.5,
    height: 50,
    marginHorizontal: 5,
    width: 105
  },
  budgetTextStyle: {
    color: globalColors.orange,
    fontFamily: "montserrat-bold",
    fontSize: 18
  },
  budget: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 19 / PixelRatio.getFontScale(),
    fontFamily: "montserrat-bold",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%"
  },
  recIcon: {
    position: "absolute",
    left: "45%",
    bottom: "65%",
    backgroundColor: globalColors.green,
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: "center",
    justifyContent: "center"
  }
});