import { I18nManager, StyleSheet } from "react-native";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  adRejectedTitle: {
    fontSize: 18,
    fontFamily: "montserrat-bold",
    color: "#EA514B",
    paddingVertical: 5,
  },
  rejectedReasonContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    flexDirection: "column",
    width: "80%",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  reasonTitle: {
    // textAlign: "left",
    color: globalColors.orange,
    textTransform: "uppercase",
    fontFamily: "montserrat-bold-english",
    fontSize: 13,
    marginBottom: 5,
  },
  rejectedReasonText: {
    // textAlign: "left",
    fontSize: 12,
    fontFamily: "montserrat-regular-english",
    color: "#fff",
    lineHeight: 16,
    textTransform: "uppercase",
  },
  rejectedModalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
    width: "75%",
  },
  rejectedModalReasonText: {
    // textAlign: "left",
    fontFamily: "montserrat-regular-english",
    fontSize: 15,
    color: "#fff",
    width: "90%",
    alignSelf: "center",
  },
  rejectedInfoButton: {
    alignSelf: "flex-end",
    marginHorizontal: 20,
    marginBottom: 15,
  },
  rejectedReasonView: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    display: "flex",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
  },
  hereReasonsText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: "#FFF",
  },
  rejectedHeader: {
    alignItems: "center",
    flex: 1,
  },
  rejectedOuterView: {
    maxHeight: "40%",
    paddingHorizontal: "5%",
    marginTop: "5%",
  },
  contentStyle: {
    paddingBottom: "10%",
  },
  rejectReasonWord: {
    fontSize: 20,
    marginLeft: 10,
  },
  rejectModalView: {
    marginTop: "5%",
    paddingHorizontal: 20,
  },
  customButtonStyle: {
    width: 120,
    height: 50,
    alignSelf: "flex-end",
    marginHorizontal: 4,
  },
  customButtonText: {
    fontSize: 14,
    color: globalColors.white,
    // paddingVertical: 5
  },
  moveToWalletButton: {
    borderColor: "#fff",
    width: 230,
  },
  rejectedButtonView: { display: "flex", flexDirection: "row" },
  reasonView: {
    display: "flex",
    alignItems: "flex-start",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    marginVertical: 5,
  },
  modalView: { margin: 0 },
});
