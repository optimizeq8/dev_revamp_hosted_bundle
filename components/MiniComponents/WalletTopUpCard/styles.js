import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  walletCard: {
    marginVertical: RFValue(2.5, 414),
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: RFValue(20, 414),
    paddingVertical: RFValue(10, 414),
    paddingHorizontal: RFValue(12.5, 414),
  },
  paymentDate: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(9, 414),
    color: "#FF8D04",
    textAlign: "left",
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  subHeading: {
    fontSize: RFValue(6.5, 414),
    lineHeight: 16,
    fontFamily: "montserrat-bold",
    color: "#FFF",
    textAlign: "left",
    textTransform: "uppercase",
  },
  subText: {
    fontFamily: "montserrat-regular-english",
    fontSize: RFValue(7, 414),
    lineHeight: 18,
    color: "#FFF",
    textTransform: "uppercase",

    textAlign: "left",
  },
  amountText: {
    fontSize: RFValue(7, 414),
    lineHeight: 18,
    fontFamily: "montserrat-bold",
    color: "#FFF",
    textAlign: "center",
    textTransform: "uppercase",
  },
  amountValue: {
    fontSize: RFValue(13, 414),
    fontFamily: "montserrat-bold-english",
    color: "#FF8D04",
    lineHeight: 34,
    textTransform: "uppercase",
  },
  transactionView: {
    paddingTop: 5,
  },
});
export default styles;
