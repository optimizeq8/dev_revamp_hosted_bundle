import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
export default StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%",
  },
  whitebutton: {
    marginTop: RFValue(7.5, 414),
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: RFValue(12.5, 414),
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: RFValue(12.5, 414),
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    alignSelf: "center",
    justifyContent: "center",
  },
  buttontext: {
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
  },
  whitebuttontext: {
    color: "#FFF",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
  },
  popupOverlay: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    textTransform: "uppercase",
  },
  pauseDes: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: RFValue(7, 414),
    // marginVertical:RFValue(10, 414),
    padding: RFValue(10, 414),
  },
});
