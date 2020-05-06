import { StyleSheet, PixelRatio } from "react-native";
export default StyleSheet.create({
  input1: {
    marginBottom: 30,
    alignSelf: "center",
    width: 300,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center",
    height: 54,
    marginTop: -20
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "flex-start",
    textAlign: "left",
    // marginBottom: -20,
    textTransform: "uppercase",
    marginLeft: 63
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    textAlign: "left",
    width: "100%",
    paddingVertical: 15,
    borderBottomColor: "transparent",
    height: 50,
    marginBottom: -10,
    marginLeft: 15
  },
  labelView: {
    // borderTopLeftRadius: 300,
    // borderTopRightRadius: 300,
    // borderBottomLeftRadius: 300,
    // borderBottomRightRadius: 300,
    // paddingTop: 5,
    width: 300,
    alignSelf: "center",
    // backgroundColor: "rgba(0,0,0,0.2)",
    // height: 15,
    zIndex: 1
  },
  downicon: {
    fontSize: 20,
    color: "#fff",
    marginLeft: -20
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
  }
});
