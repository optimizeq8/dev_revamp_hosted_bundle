import { StyleSheet, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
export default StyleSheet.create({
  scrollContainerStyle: {
    alignItems: "center",
    width: "100%",
    height: "100%",
    top: 10,
  },
  budgetCardsStyle: {
    alignSelf: "center",
    width: "100%",
    maxHeight: "50%",
  },
  budgetCardStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 40,
    borderColor: globalColors.purple,
    borderWidth: 2.5,
    height: widthPercentageToDP(10),
    marginHorizontal: 3,
    width: widthPercentageToDP(25),
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 0 },
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
    fontSize: RFValue(9.5 / PixelRatio.getFontScale(), 414),
    fontFamily: "montserrat-bold",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%",
  },
  recIcon: {
    position: "absolute",
    left: "10%",
    top: -5,
    backgroundColor: globalColors.green,
    borderRadius: 50,
    paddingHorizontal: 5,
    paddingVertical: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  recommendText: {
    fontSize: RFValue(4.5, 414),
    color: globalColors.white,
    fontFamily: "montserrat-bold",
  },
  dollarText: {
    fontSize: RFValue(7.5, 414),
    color: globalColors.purple,
    marginRight: RFValue(-15, 414),
    fontFamily: "montserrat-bold",
  },
});
