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
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    paddingTop: 10,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    paddingHorizontal: 10
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
