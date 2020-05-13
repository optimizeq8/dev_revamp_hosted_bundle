import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  marginVertical: {
    // marginTop: 40,
    // marginVertical: 30,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  labelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.16)",
    height: 15,
    zIndex: 1
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
  inputLabelNew: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    textTransform: "uppercase",
    // alignSelf: "center",
    textAlign: "left",
    borderRadius: 30,
    // marginBottom: -10,
    marginTop: I18nManager.isRTL ? -5 : 0
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    marginVertical: 50,
    borderRadius: 32.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  icon: {
    fontSize: 45,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  container: {
    backgroundColor: "transparent",
    // flex: 1,
    alignItems: "center",
    // padding: 20,
    // paddingTop: 20,
    justifyContent: "space-around"
  },
  info: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  mainCard: {
    top: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontFamily: "montserrat-light",
    fontSize: 14
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    marginTop: 10,
    lineHeight: 18
    // marginBottom: 60
  },
  input: {
    fontFamily: "montserrat-light-english",
    fontSize: 21 / PixelRatio.getFontScale(),
    alignSelf: "center",
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    width: 190,
    height: 30
  },
  phoneInput: {
    borderRadius: 50,
    borderColor: "transparent",
    alignSelf: "center",
    width: widthPercentageToDP(75),
    height: 50
  },
  phoneView: {
    width: "100%",
    flex: 1
  },
  phoneInputNew: {
    borderRadius: 50,
    borderColor: "transparent",
    alignSelf: "center",
    width: "100%",
    height: 56,
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.16)",
    paddingHorizontal: 20
  },
  flagTouchableArea: {
    width: 60,
    height: 30,
    position: "absolute",
    borderWidth: 0.3,
    borderColor: "transparent",
    borderRadius: 5,
    left: 4,
    zIndex: 5
  },
  flagIcon: {
    marginRight: -30,
    left: 50,
    alignSelf: "center",
    top: 7
  },
  flagStyle: {
    left: 0,
    zIndex: 5
  },
  phoneInputTextStyle: {
    left: "3%"
  },
  optionTextStyle: {
    alignSelf: "flex-start"
  },
  keyboardArea: {
    // flex: 1,
    // alignItems: "center",
    // justifyContent: "center"
  },
  phoneViewContainer: {
    justifyContent: "space-around"
  },
  phoneInputStyle: { width: widthPercentageToDP(70) }
});

export default styles;
