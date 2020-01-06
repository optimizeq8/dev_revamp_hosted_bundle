import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  walletCard: {
    marginVertical: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 40,
    paddingVertical: 20,
    paddingHorizontal: 25
  },
  paymentDate: {
    fontFamily: "montserrat-bold-english",
    fontSize: 18,
    color: "#FF8D04",
    textAlign: "left"
  },
  flexBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10
  },
  subHeading: {
    fontSize: 13,
    lineHeight: 16,
    fontFamily: "montserrat-bold",
    color: "#FFF",
    textAlign: "left"
  },
  subText: {
    fontFamily: "montserrat-regular-english",
    fontSize: 14,
    lineHeight: 18,
    color: "#FFF",
    textAlign: "left"
  },
  amountText: {
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "montserrat-bold",
    color: "#FFF",
    textAlign: "center"
  },
  amountValue: {
    fontSize: 26,
    fontFamily: "montserrat-bold-english",
    color: "#FF8D04",
    lineHeight: 34
  },
  transactionView: {
    paddingTop: 5
  }
});
export default styles;
