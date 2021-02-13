import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  mainViewFilterStatus: {
    flexDirection: "row",
    justifyContent: "center",
  },
  flexDirectionCol: {
    flexDirection: "column",
  },
  middleBlock: {
    paddingHorizontal: RFValue(20, 414),
  },
  inactiveButton: {
    backgroundColor: "transparent",
    alignSelf: "center",
    borderColor: "#fff",
    borderWidth: 1,
    width: RFValue(11.5, 414),
    height: RFValue(11.5, 414),
    borderRadius: 11.5,
    marginBottom: RFValue(5, 414),
  },
  activeButton: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: RFValue(11.5, 414),
    height: RFValue(11.5, 414),
    borderRadius: 11,
    marginBottom: RFValue(5, 414),
  },
  text: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    color: "#fff",
    marginBottom: RFValue(5, 414),
  },
});
export default styles;
