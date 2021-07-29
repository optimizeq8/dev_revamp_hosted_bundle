import { StyleSheet, PixelRatio } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaView: {
    // backgroundColor: "#0000",
    backgroundColor: globalColors.bluegem,
    height: "100%",
    flex: 1,
  },
  container: {
    backgroundColor: "#0000",
    justifyContent: "space-between",
  },
  mainContent: {
    paddingBottom: "10%",
    // flexGrow: 1,
    // height: "100%",
    // flex: 1,
    paddingTop: RFValue(6.5, 414),
  },
  inputView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 5,
    width: 150,
    height: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1,
    flex: 1,
  },
  input: {
    marginBottom: 30,
    alignSelf: "center",
    width: 300,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: -10,
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    paddingVertical: RFValue(5, 414),
    borderBottomColor: "transparent",
    height: RFValue(25, 414),
  },
  inputTextarea: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    paddingVertical: RFValue(5, 414),
    borderBottomColor: "transparent",
  },
  networkLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    top: 2,
  },
  keyboardContainer: {
    flex: 1,
    height: "100%",
  },
  proceedButtonRTL: {
    width: "50%",
    height: RFValue(25, 414),
    marginHorizontal: 0,
  },
  button: {
    width: "45%",
    height: RFValue(25, 414),
    borderWidth: 1,
    borderColor: globalColors.white,
    marginHorizontal: 0,
  },
});

export default styles;
