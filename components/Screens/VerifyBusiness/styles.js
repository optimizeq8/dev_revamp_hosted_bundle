import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  approvalText: {
    color: globalColors.rum,
    fontSize: RFValue(8, 414),
    textAlign: "center",
    fontFamily: "montserrat-regular",
    width: "80%",
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
});

export default styles;
