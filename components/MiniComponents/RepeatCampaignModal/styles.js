import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
export default StyleSheet.create({
  datePickerContainer: {
    height: "80%",
    width: "100%",
    backgroundColor: "#fff",
    // top: RFValue(5, 414),
    borderRadius: RFValue(25, 414),
    padding: RFValue(4, 414),
  },
});
