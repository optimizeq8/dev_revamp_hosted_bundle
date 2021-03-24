import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
export default StyleSheet.create({
  datePickerContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: RFValue(25, 414),

    padding: RFValue(4, 414),
  },
  dateContainer: {
    justifyContent: "center",
    width: "70%",
    alignSelf: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  titleStyle: {
    fontSize: RFValue(8, 414),
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    color: globalColors.rum,
  },
  dateStyle: {
    color: globalColors.orange,
  },
  descStyle: {
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-regular",
    width: "60%",
    textAlign: "center",
    alignSelf: "center",
    paddingVertical: 10,
  },
  campaignDurationContainerStyle: {
    width: "80%",
    alignItems: "center",
  },
});
