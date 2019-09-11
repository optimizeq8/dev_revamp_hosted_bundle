import { StyleSheet } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

export default StyleSheet.create({
  lottieViewContainer: {
    alignSelf: "center",
    width: heightPercentageToDP(9),
    height: heightPercentageToDP(9),
    alignContent: "center",
    alignItems: "center"
  },
  mainView: {
    alignSelf: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
});
