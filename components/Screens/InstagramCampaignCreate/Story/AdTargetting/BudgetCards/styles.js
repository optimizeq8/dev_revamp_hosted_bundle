import { StyleSheet, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../../../GlobalStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";
export default StyleSheet.create({
  scrollContainerStyle: {
    alignItems: "center",
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: RFValue(5, 414),
  },
  budgetCardsStyle: { alignSelf: "center" },
  budgetCardStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: RFValue(20, 414),
    borderColor: globalColors.purple,
    borderWidth: 2.5,
    height: widthPercentageToDP(10),
    marginHorizontal: 3,
    width: widthPercentageToDP(25),
    shadowColor: "#000",
    shadowOffset: { width: RFValue(1, 414), height: 0 },
    shadowRadius: 7,
    shadowOpacity: 0.1,
  },
  budgetTextStyle: {
    color: globalColors.purple,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
  },
  budget: {
    alignSelf: "center",
    color: globalColors.purple,
    fontSize: RFValue(9.5 / PixelRatio.getFontScale()),
    fontFamily: "montserrat-bold",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%",
  },
  recIcon: {
    position: "absolute",
    left: "61%",
    top: RFValue(2, 414),
    backgroundColor: globalColors.green,
    borderRadius: RFValue(25, 414),
    paddingHorizontal: RFValue(2.5, 414),
    paddingVertical: RFValue(1, 414),
    alignItems: "center",
    justifyContent: "center",
  },
  recommendText: {
    fontSize: RFValue(4.5, 414),
    color: globalColors.white,
    fontFamily: "montserrat-bold",
  },
});
