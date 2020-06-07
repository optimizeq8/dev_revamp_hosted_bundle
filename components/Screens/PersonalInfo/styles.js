import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";

const styles = StyleSheet.create({
  safeAreaViewContainer: { flex: 1, backgroundColor: "#0000" },
  personalInfoIcon: {
    alignSelf: "center",
    marginTop: 20
  },
  dataContainer: {
    paddingHorizontal: 35,
    paddingTop: 20,
    alignItems: "center"
  },
  marginVertical: {
    marginVertical: 10
  },
  nameText: {
    color: "#5F5F5F",
    fontFamily: "montserrat-medium",
    fontSize: 23,
    textAlign: "left",
    paddingBottom: 60
  },
  itemMobileNo: {
    marginBottom: 30
  },
  labelMobileNo: {
    fontSize: 14 / PixelRatio.getFontScale()
  },
  labelEmail: {
    bottom: 5,
    // alignSelf: "center",
    fontSize: Platform.OS === "android" ? 14 / PixelRatio.getFontScale() : 14
  },
  mainCard: {
    flex: 1
  },
  button: {
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  contentContainer: {
    paddingVertical: 20,
    justifyContent: "space-around"
  },
  label: {
    color: "#FF9D00",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    textAlign: "left"
  },
  inputText: {
    fontFamily: "montserrat-regular-english",
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontSize: 21 / PixelRatio.getFontScale(),
    color: "#4B4B4B"
  },
  input: {
    // bottom: 25,
    marginBottom: 10,
    // alignSelf: "center",
    // width: "90%",
    // height: 45,
    borderColor: "#7039FF"
  },
  fullNameView: {
    width: "100%"
  },
  phoneInput: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 10,
    marginTop: 10
  },
  mobileView: {
    width: "100%",
    marginBottom: 30
  },
  emailItem: { width: "100%", marginTop: 25 },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#FFF",
    textAlign: "center"
  },
  labelView: {
    height: 15,
    width: 150,
    alignSelf: "center",
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 2,
    marginBottom: 0,
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  flagIcon: {
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 0
  },
  flagStyle: {
    height: 15
  },
  businessView: {
    paddingBottom: "30%",
    paddingTop: 13,
    paddingHorizontal: 20
    // flex: 1
  }
});

export default styles;
