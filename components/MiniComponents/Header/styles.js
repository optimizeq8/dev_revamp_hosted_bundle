import { StyleSheet, I18nManager } from "react-native";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  container: {
    justifyContent: "space-evenly",
    zIndex: 13,
    paddingHorizontal: wp(5),
    paddingTop: hp(1),
    flexDirection: "row",
    backgroundColor: "#0000"
  },
  left: {
    flex: 0,
    width: 50,
    height: 50,
    zIndex: 1
  },
  title: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-bold",
    left: 15,
    bottom: I18nManager.isRTL ? 0 : 12
  },
  right: {
    alignItems: "center",
    width: 50
  },
  edit: {
    // fontFamily: "montserrat-light",
    fontSize: 14,
    color: "#fff",
    fontFamily: "montserrat-regular",
    textDecorationLine: "underline"
  },
  titleText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-bold",
    paddingHorizontal: 2
  },
  titleView: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  }
});
export default styles;
