import { StyleSheet } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

export default StyleSheet.create({
  lottieViewContainer: {
    // zIndex: 10,
    alignSelf: "center",
    width: 90,
    height: 90,
    alignContent: "center",
    alignItems: "center"
  },
  mainView: {
    // position: "absolute",

    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    position: "absolute",

    justifyContent: "center",
    top: "52%",
    left: "48%",
    transform: [
      {
        translateX: -50
      },
      {
        translateY: -50
      }
    ]
  }
});
