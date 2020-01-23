import { StyleSheet } from "react-native";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  adRejectedTitle: {
    fontSize: 18,
    fontFamily: "montserrat-bold",
    color: "#EA514B",
    paddingVertical: 5
  },
  rejectedReasonContainer: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 20,
    flexDirection: "column",
    // alignItems: "center",
    // height: 80,
    // width: "100%",
    justifyContent: "space-evenly",
    marginTop: 10
  },
  reasonTitle: {
    textAlign: "left",
    color: globalColors.orange,
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: 13,
    marginBottom: 5
  },
  rejectedReasonText: {
    textAlign: "left",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    color: "#fff",
    lineHeight: 16
    // width: 200
  },
  rejectedModalTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-evenly",
    width: "75%"
  },
  rejectedModalReasonText: {
    textAlign: "left",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    color: "#fff",
    width: "70%",
    alignSelf: "center"
  },
  rejectedInfoButton: {
    alignSelf: "flex-end",
    marginHorizontal: 20,
    marginBottom: 15
  },
  rejectedReasonView: {
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  hereReasonsText: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: "#FFF"
  },
  rejectedHeader: {
    alignItems: "center",
    flex: 1
  },
  rejectedOuterView: {
    maxHeight: 280,
    paddingHorizontal: "5%"
  },
  contentStyle: {
    paddingBottom: "10%"
  },
  rejectReasonWord: {
    fontSize: 20,
    marginLeft: 10
  },
  rejectModalView: {
    marginTop: "5%",
    paddingHorizontal: 20
  },
  customButtonStyle: {
    width: 164,
    height: 40,
    alignSelf: "flex-end",
    paddingHorizontal: 20
  },
  customButtonText: {
    fontSize: 14
    // paddingVertical: 5
  }
});
