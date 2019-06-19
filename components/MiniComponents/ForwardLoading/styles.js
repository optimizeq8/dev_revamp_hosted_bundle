import { StyleSheet } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

export default StyleSheet.create({
  lottieViewContainer: {
    // zIndex: 10,
    alignSelf: "center",
    width: heightPercentageToDP(9),
    height: heightPercentageToDP(9),
    alignContent: "center",
    alignItems: "center"
  },
  mainView: {
    // position: "absolute",

    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    // position: "absolute",

    justifyContent: "center"
    // bottom: 18
    // left: "50%",
    // transform: [
    //   {
    //     translateX: -50
    //   },
    //   {
    //     translateY: -50
    //   }
    // ]
  }
});
