import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
export default StyleSheet.create({
  textContainer: {
    alignSelf: "center",
    // backgroundColor: "#0009",
    width: "80%",
    height: heightPercentageToDP(20),
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  textUpdate: {
    fontFamily: "montserrat-bold",
    color: globalColors.white,
    textAlign: "center",
    fontSize: 16
  },
  loadingStyle: {
    zIndex: 10,
    alignSelf: "center",
    width: widthPercentageToDP(20),
    height: widthPercentageToDP(20)
  },
  updateButton: {
    width: "70%",
    alignSelf: "center",
    height: 50,
    borderRadius: 40
  },
  blurStyle: { height: "100%", justifyContent: "center" },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100%"
  }
});
