import { StyleSheet, PixelRatio, I18nManager } from "react-native";
export default StyleSheet.create({
  input1: {
    backgroundColor: "rgba(0,0,0,0.16)",
    // paddingHorizontal: 10,
    borderRadius: 150,
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: "100%",
    borderWidth: 0,
    // height: 54,
    // paddingHorizontal: 18,
    display: "flex",
    alignItems: "center",
    marginVertical: 15
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "flex-start",
    textAlign: I18nManager.isRTL ? "right" : "left",
    // marginBottom: -20,
    textTransform: "uppercase",
    marginTop: 10
  },
  inputText: {
    fontFamily: "montserrat-light-english",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "flex-start",
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: "#FFF",
    marginBottom: 10,
    paddingLeft: 0,
    paddingRight: 0,
    height: 20
  },
  downicon: {
    fontSize: 20,
    color: "#fff",
    marginLeft: -20
  },
  downiconEnd: {
    fontSize: 20,
    color: "#fff",
    marginLeft: -80
  },
  modalBar: {
    flexDirection: "row"
  },
  networkLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    top: 2,
    textTransform: "uppercase"
  },
  networkStringButton: {
    width: 85,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 0
  },
  colView: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    marginLeft: 13,
    width: "100%"
  },
  rowView: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  iconSize: {
    fontSize: 16 / PixelRatio.getFontScale()
  },
  icon: {
    marginLeft: 15
  }
});
