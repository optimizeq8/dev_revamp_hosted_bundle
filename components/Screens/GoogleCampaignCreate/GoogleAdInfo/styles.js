import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%"
  },
  container: {
    backgroundColor: "#0000",
    display: "flex",
    justifyContent: "space-between"
  },
  backDrop: {
    position: "absolute",
    top: hp(5) < 30 ? -hp("73%") : -hp("63%"),
    alignSelf: "center"
  },
  iconView: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: wp(100),
    paddingTop: 10
  },
  googleIcon: {
    alignSelf: "center",
    marginTop: 20
  },
  mainContent: {
    paddingBottom: hp(35),
    paddingTop: 20
  },
  scrollViewStyle: {
    marginTop: 15
  },
  inputViewContainer: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 30,
    paddingTop: 5,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 20,
    zIndex: 1
  },
  input1: {
    marginBottom: 30,
    alignSelf: "center",
    width: 300,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: 0,
    height: 20
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
    height: 50
  },
  input2: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: "center",
    width: 300,
    height: 50,
    marginBottom: 20,
    borderColor: "transparent"
  },
  label: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%"
  },
  downicon: {
    color: "#fff",
    fontSize: 20
  },
  popupOverlay: {
    height: "100%"
  },
  topContainer: {
    paddingVertical: 10,
    width: 300,
    flexDirection: "row",
    alignSelf: "center"
  },
  choiceButtonRight: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 40,
    borderTopEndRadius: 40
  },
  choiceButtonLeft: {
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 40,
    borderTopStartRadius: 40
  },
  inactiveButton: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 150,
    height: 60,
    justifyContent: "center",
    flexDirection: "column"
  },
  activeButton: {
    backgroundColor: "#FF9D00",
    height: 60,
    width: 150,
    justifyContent: "center",
    flexDirection: "column"
  },
  inactiveText: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center"
  },
  activeText: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },

  dateTextLabel: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  countryTextLabel: {
    marginTop: 30,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  languageChoiceView: {
    paddingTop: 10
  },
  languageChoiceText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    textAlign: "center"
  },
  proceedButtonRTL: {
    width: 55,
    height: 55,
    backgroundColor: globalColors.orange,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 4
    // padding: 20
  }
});

export default styles;