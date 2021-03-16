import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  customStyleInput: {
    width: "100%",
    alignSelf: "flex-start",
  },
  customAnimate: {
    width: RFValue(90, 414),
  },
  inputView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: RFValue(32.5, 414),
    height: RFValue(32.5, 414),
    borderRadius: 32.5,
    // bottom: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7 / PixelRatio.getFontScale(), 414),
    alignSelf: "center",
    textAlign: "center",
    // height: 40,
    color: "#FFF",
  },
  input: {
    height: RFValue(30, 414),
    alignSelf: "center",
    justifyContent: "center",
    width: RFValue(50, 414),
    borderColor: "#7039FF",
    flexDirection: "row",
    borderBottomWidth: 1.5,
  },
  contentScrollViewContainer: {
    paddingBottom: "70%",
    paddingHorizontal: RFValue(13, 414),
  },
  marginVertical: {
    marginBottom: RFValue(12.5, 414),
  },
  callToActionLabelView: {
    borderTopLeftRadius: RFValue(75, 414),
    borderTopRightRadius: RFValue(75, 414),
    borderBottomRightRadius: RFValue(10, 414),
    borderBottomLeftRadius: RFValue(10, 414),
    paddingTop: RFValue(4, 414),
    width: RFValue(75, 414),
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: RFValue(7.5, 414),
    zIndex: 1,
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: RFValue(75, 414),
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: RFValue(150, 414),
    borderWidth: 0,
    height: RFValue(25, 414),
  },
  pickerText: {
    fontFamily: "montserrat-regular-english",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: RFValue(6, 414),
  },
  iconDown: {
    color: "#FFF",
    fontSize: RFValue(10, 414),
    right: RFValue(7.5, 414),
  },
  itemView: {
    paddingHorizontal: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: RFValue(15, 414),
    marginBottom: -10,
    marginTop: I18nManager.isRTL ? -5 : 0,
  },
  locationIcon: {
    marginLeft: RFValue(7.5, 414),
  },
});

export default styles;
