import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../../../GlobalStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";
export default StyleSheet.create({
  scrollContainerStyle: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  budgetCardsStyle: { alignSelf: "center" },
  budgetCardStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    borderColor: globalColors.purple,
    borderWidth: 2.5,
    height: widthPercentageToDP(10),
    marginHorizontal: 5,
    width: widthPercentageToDP(25),
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
    shadowRadius: 7,
    shadowOpacity: 0.1,
  },
  budgetTextStyle: {
    color: globalColors.purple,
    fontFamily: "montserrat-bold",
    fontSize: 16,
  },
  budget: {
    alignSelf: "center",
    color: globalColors.purple,
    fontSize: 19 / PixelRatio.getFontScale(),
    fontFamily: "montserrat-bold",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%",
  },
  recIcon: {
    position: "absolute",
    left: "47%",
    bottom: "70%",
    backgroundColor: globalColors.orange,
    borderRadius: 50,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
