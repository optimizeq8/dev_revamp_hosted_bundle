import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

export default StyleSheet.create({
  durationContainer: {
    backgroundColor: "rgba(0,0,0,0.16)",
    borderRadius: 150,
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: "100%",
    borderWidth: 0,
    height: RFValue(27, 414),
    alignItems: "center",
    marginBottom: RFValue(12.5, 414),
    marginTop: RFValue(5, 414),
    flexDirection: "row",
    paddingHorizontal: RFValue(10, 414),
  },
  durationLabel: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    color: "#fff",
    alignSelf: "flex-start",
    textAlign: I18nManager.isRTL ? "right" : "left",
    textTransform: "uppercase",
    marginTop: RFValue(5, 414),
  },
  durationContent: {
    marginLeft: RFValue(6.5, 414),
    width: "90%",
    height: "100%",
    justifyContent: "center",
  },
  durationButtons: {
    alignSelf: "flex-end",
    position: "absolute",
    flexDirection: "row",
    width: "40%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  durButton: {
    width: "50%",
    height: "80%",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: globalColors.orange,
  },
  leftButton: {
    borderBottomLeftRadius: 50,
    borderTopLeftRadius: 50,
    borderTopEndRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightButton: {
    borderBottomRightRadius: 50,
    borderTopRightRadius: 50,
    borderTopStartRadius: 0,
    borderBottomLeftRadius: 0,
    borderStartColor: "#000",
    borderStartWidth: 0.2,
  },
  buttonText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(12.5, 414),
    color: "#fff",
    textAlign: "center",
  },
  durationData: {
    fontFamily: "montserrat-bold-english",
    color: globalColors.orange,
    fontSize: RFValue(7, 414),
    paddingVertical: RFValue(2.5, 414),
    textTransform: "uppercase",
    alignSelf: "flex-start",
  },
});
