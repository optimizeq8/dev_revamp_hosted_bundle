import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  mainSafeArea: {
    height: "100%",
    backgroundColor: "#0000"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  contentContainer: {
    alignSelf: "center",
    height: "98%",
    width: "100%",
    marginTop: hp(3),
    padding: 0
  }
});

export default styles;
