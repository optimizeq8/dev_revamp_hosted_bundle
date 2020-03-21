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
    paddingBottom: hp(2),
    paddingTop: hp(1),
    flexDirection: "row",
    backgroundColor: "#0000",
    alignItems: "center",
    width: wp("100%"),
    height: 70
  },
  left: {
    width: "10%",
    height: "150%",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-bold",
    width: wp("80%")
  },
  right: {
    alignItems: "center",
    width: wp("10%")
  },
  edit: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-regular",
    textDecorationLine: "underline"
  },
  titleText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-bold",
    alignSelf: "center",
    paddingHorizontal: 2,
    alignSelf: "center",
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  titleView: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: wp("80%"),
    height: 50
  },
  googleIcon: {
    alignSelf: "center"
    // width: 30
    // marginTop: 20
  }
});
export default styles;
