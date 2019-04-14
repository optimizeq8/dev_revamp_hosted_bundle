import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
export default (styles = {
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },

  backButton: {
    top: hp(5),
    left: wp(8),
    width: 20,
    height: 20,
    zIndex: 10,
    elevation: 4
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});
