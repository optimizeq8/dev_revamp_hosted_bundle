import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  itemDisableView: {
    opacity: 0.6,
  },
  outView: {
    flex: 1,
    backgroundColor: globalColors.offWhite,
  },
  titleStyle: {
    color: globalColors.rum,
  },
  textView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 5,
  },
  itemView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginHorizontal: 10,
    marginVertical: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: globalColors.white,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
  },
  heading: {
    fontSize: RFValue(7, 414),
    color: globalColors.rum,
    fontFamily: "montserrat-regular",
  },
  description: {
    fontSize: RFValue(9, 414),
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
  },
  infoView: {
    paddingHorizontal: 8,
  },
  submitButton: {
    height: RFValue(25, 414),
    marginBottom: RFValue(10, 414),
    marginHorizontal: RFValue(10, 414),
    // alignSelf: "flex-start",
  },
  radioButton: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderColor: globalColors.orange,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  radioButtonActive: {
    width: 15,
    height: 15,
    borderRadius: 30,
    backgroundColor: globalColors.orange,
  },
});
export default styles;
