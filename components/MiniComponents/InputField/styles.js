import { StyleSheet, PixelRatio } from "react-native";
export default StyleSheet.create({
  input1: {
    marginBottom: 30,
    alignSelf: "center",
    width: 300,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    paddingHorizontal: 20,
    justifyContent: "center"
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    marginBottom: -10
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    textAlign: "center",
    width: "100%",
    paddingVertical: 15,
    borderBottomColor: "transparent",
    height: 50
  },
  labelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 5,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  downicon: {
    fontSize: 20,
    color: "#fff",
    marginLeft: -20
  },
  modalBar: {
    flexDirection: "row"
  }
});