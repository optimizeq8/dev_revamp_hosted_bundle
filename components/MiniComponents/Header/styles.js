import { StyleSheet } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    zIndex: 13,
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    flexDirection: "row",
    backgroundColor: "#0000"
  },
  left: {
    flex: 0
  },
  title: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  right: {
    flex: 0
    // width: 24
  },
  edit: {
    // fontFamily: "montserrat-extralight",
    fontSize: 16,
    color: "#fff",
    fontFamily: "montserrat-regular"
  }
});
export default styles;
