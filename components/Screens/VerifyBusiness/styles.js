import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  title: {
    color: globalColors.rum,
    fontSize: RFValue(8, 414),
    fontFamily: "montserrat-bold",
    paddingVertical: 3,
    // width: "80%",
    // textAlign: "left",
  },
  businessname: {
    color: globalColors.rum,
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
    paddingVertical: 3,
    // width: "80%",
    // textAlign: "left",
  },
  approvalText: {
    color: globalColors.rum,
    fontSize: RFValue(8, 414),
    textAlign: "left",
    fontFamily: "montserrat-regular",
    width: "100%",
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  refreshButton: {
    marginVertical: RFValue(15, 414),
    // marginHorizontal: RFValue(10, 414),
    // paddingHorizontal: 20,
    width: "80%",
  },
  textRefreshStyle: {
    color: globalColors.white,
    fontSize: RFValue(8, 414),
    textAlign: "center",
    fontFamily: "montserrat-bold",
  },
  verifyBusinessView: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalColors.white,
    marginHorizontal: 20,
    marginVertical: 30,
    borderRadius: 20,
    paddingVertical: 20,
  },
  businessNameview: {
    display: "flex",
    flexDirection: "row",
    // alignItems: "center",
  },
  rejectedReason: {
    color: globalColors.rum,
    fontSize: RFValue(8, 414),
    textAlign: "left",
    fontFamily: "montserrat-regular",
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  rejView: {
    paddingHorizontal: 10,
  },
  rejectedReasonHeading: {
    color: globalColors.rum,
    fontSize: RFValue(7, 414),
    textAlign: "left",
    fontFamily: "montserrat-regular",
    paddingBottom: 7,
    width: "100%",
    paddingHorizontal: 20,
  },
});

export default styles;
