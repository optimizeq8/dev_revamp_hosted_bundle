import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import { widthPercentageToDP } from "react-native-responsive-screen";
export default StyleSheet.create({
  textContainer: {
    alignSelf: "center",
    top: "20%",
    // backgroundColor: "#0009",
    width: "80%",
    height: "20%",
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
    height: widthPercentageToDP(20),
    top: "30%"
  },
  updateButton: {
    // backgroundColor: globalColors.orange,
    width: "70%",
    alignSelf: "center",
    top: "40%",
    borderRadius: 40
  }
});
