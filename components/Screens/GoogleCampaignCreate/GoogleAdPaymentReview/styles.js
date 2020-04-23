import { StyleSheet, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  budgetView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12
  },
  budgetText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#FFFFFF",
    textTransform: "uppercase"
  },
  budgetAmountView: {
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row"
  },
  budgetDollarText: {
    color: "#FFFFFF",
    fontFamily: "montserrat-medium",
    fontSize: 14
  },
  budgetAmountText: {
    color: "#FF9D00",
    fontFamily: "montserrat-bold-english",
    fontSize: 24
  },
  contentContainerStyle: {
    paddingHorizontal: 5
  },
  footerBlock: {
    paddingBottom: 10,
    margin: 0,
    borderTopWidth: 0,
    height: 100,
    backgroundColor: "#FFF",
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    marginLeft: 0,
    marginRight: 0,
    width: "100%"
  },
  optimizeFeesPercentange: {
    color: "#C6C6C6",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    paddingRight: 2
  },
  safeAreaView: {
    height: "100%",
    width: "100%"
  },
  container: {
    height: "100%",
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    display: "flex",
    overflow: "hidden",
    justifyContent: "space-between"
  },
  mainCard: {
    backgroundColor: "#FF9D00",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: 45,
    width: widthPercentageToDP(50),
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 30,
    justifyContent: "center"
  },

  bottomCardBlock1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingRight: 40,
    paddingLeft: 55,
    paddingTop: 15,
    paddingBottom: 20,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  dollarAmountContainer: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignSelf: "flex-start"
  },
  dollarAmountText: {
    fontSize: 15,
    color: "#FF9D00"
  },
  kdAmountContainer: {
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    alignSelf: "flex-start",
    paddingTop: 2
  },
  kdText: {
    fontSize: 11,
    color: "#C6C6C6",
    fontFamily: "montserrat-bold-english"
  },
  kdAmountText: {
    fontSize: 13,
    fontFamily: "montserrat-bold-english",
    paddingLeft: 4,
    color: "#C6C6C6"
  },
  optimizeFeesTextContainer: {
    flexDirection: "row",
    paddingTop: 10
  },
  optimizeFeesText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-light"
  },
  payNowText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-bold"
  },
  money: {
    color: "#FF8D04",
    fontSize: 21,
    fontFamily: "montserrat-bold"
  }
});

export default styles;
