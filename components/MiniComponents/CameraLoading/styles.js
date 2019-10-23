import { StyleSheet } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

export default StyleSheet.create({
  lottieViewContainer: {
    width: 100,
    height: 100
  },
  mainView: {
    alignSelf: "center",
    position: "absolute"

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
