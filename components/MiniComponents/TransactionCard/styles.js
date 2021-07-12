import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    width: "100%",
    paddingVertical: 13,
    alignItems: "center",
  },
  amountContainer: {
    flexDirection: "column",
  },
  amountText: {
    fontSize: RFValue(13, 414),
    paddingHorizontal: 0,
    color: "#FF8D04",
  },
  cardStyle: {
    justifyContent: "space-between",
    backgroundColor: "rgba(0,0,0,0.2)",
    flex: 1,
    marginHorizontal: RFValue(7.5, 414),
    borderRadius: RFValue(20, 414),
    marginVertical: RFValue(4.5, 414),
    paddingVertical: RFValue(9, 414),
    paddingHorizontal: RFValue(12.5, 414),
  },
  text: {
    color: "#FFF",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6.5, 414),
    textAlign: "left",
    textTransform: "uppercase",
  },
  amountTextTitle: {
    color: "#FFF",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    textAlign: "center",
    textTransform: "uppercase",
  },
  dateText: {
    color: "#FF8D04",
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(9, 414),
    textAlign: "left",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  titleText: {
    textAlign: "left",
    color: "#FFFF",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    paddingVertical: 0,
    paddingHorizontal: RFValue(5, 414),
    width: RFValue(97.5, 414),
    textTransform: "uppercase",
  },
  subText: {
    fontFamily: "montserrat-regular-english",
    fontSize: RFValue(7, 414),
    color: "#FFF",
    textAlign: "left",
    marginTop: 3,
    textTransform: "uppercase",
  },
  icon: {
    color: "#FFFF",
    fontSize: RFValue(17.5, 414),
  },
  transactionText: {
    marginTop: 7,
  },
  instagramIcon: {
    marginRight: -25,
    marginLeft: -20,
    marginBottom: -25,
    marginTop: -20,
  },
  refundedContainer: {
    backgroundColor: globalColors.red,
    borderRadius: 20,
    padding: RFValue(5, 414),
    alignSelf: "center",
    left: RFValue(10, 414),
  },
  refundedText: {
    color: globalColors.white,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
  },
  invoiceButton: {
    borderWidth: 1,
    borderRadius: RFValue(10, 414),
    borderColor: globalColors.white,
    paddingVertical: RFValue(2.5, 414),
    paddingHorizontal: RFValue(4, 414),
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
});

export default styles;
