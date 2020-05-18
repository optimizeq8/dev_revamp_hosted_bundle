import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  customStyleInput: { width: "95%", alignSelf: "flex-start" },
  customAnimate: { width: "50%" },
  inputView: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between"
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    // bottom: 45,
    alignItems: "center",
    justifyContent: "center"
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    // height: 40,
    color: "#FFF"
  },
  input: {
    height: 60,
    alignSelf: "center",
    justifyContent: "center",
    width: 100,
    borderColor: "#7039FF",
    flexDirection: "row",
    borderBottomWidth: 1.5
  },
  contentScrollViewContainer: {
    paddingBottom: "70%",
    paddingHorizontal: 26
  },
  marginVertical: {
    marginBottom: 25
  },
  callToActionLabelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 150,
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: 300,
    borderWidth: 0,
    height: 50
  },
  pickerText: {
    fontFamily: "montserrat-regular-english",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12
  },
  iconDown: {
    color: "#FFF",
    fontSize: 20,
    right: 15
  },
  itemView: {
    paddingHorizontal: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: -10,
    marginTop: I18nManager.isRTL ? -5 : 0
  },
  locationIcon: {
    marginLeft: 15
  }
});

export default styles;
