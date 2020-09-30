import { StyleSheet, PixelRatio } from "react-native";
import globalStyles, { globalColors } from "../../../GlobalStyles";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%",
  },
  whitebutton: {
    marginTop: 15,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 25,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 25,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttontext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-bold",
  },
  whitebuttontext: {
    color: "#FFF",
    fontSize: 14,
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
    fontSize: 14,
    textTransform: "uppercase",
  },
  pauseDes: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 14,
    // marginVertical: 20,
    padding: 20,
  },
});
