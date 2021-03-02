import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default StyleSheet.create({
  datePickerContainer: {
    height: "80%",
    width: "100%",
    backgroundColor: "#fff",
    top: heightPercentageToDP(20),
    borderRadius: 50,
    padding: 8,
  },
});
