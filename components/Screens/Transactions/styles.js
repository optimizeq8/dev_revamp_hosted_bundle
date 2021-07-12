import { StyleSheet, Dimensions } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0000",
  },
  searchContainer: {
    height: 50,
    width: "80%",
    zIndex: 10,
  },
  headerBlock: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  container: {
    backgroundColor: "#0000",
    width: "100%",
    height: "100%",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainer: {
    paddingBottom: heightPercentageToDP(30),
    // marginBottom: heightPercentageToDP(50)
  },
  activebutton: {
    justifyContent: "center",
    width: RFValue(27.5, 414),
    height: RFValue(27.5, 414),
  },
  mainContainer: {
    width: "100%",
    height: "100%",
  },
  noTranText: {
    alignSelf: "center",
    fontSize: RFValue(9, 414),
    color: "#FFF",
    fontFamily: "montserrat-regular",
    paddingVertical: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

export default styles;
