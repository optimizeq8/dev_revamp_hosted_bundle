import { StyleSheet, PixelRatio } from "react-native";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
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
    paddingTop: 13,
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
    paddingVertical: 10,
    borderBottomColor: "transparent",
    height: 50,
  },
  inputTextarea: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    paddingVertical: 10,
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
    width: 65,
    height: 65,
  },
  button: {
    alignSelf: "center",
    width: wp(10),
    height: hp(7.5),
    bottom: hp(3),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginHorizontal: wp(10),
  },
});

export default styles;
