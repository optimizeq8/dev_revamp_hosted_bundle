import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    // backgroundColor: "#0000",
    backgroundColor: globalColors.bluegem,
  },
  walletIcon: {
    alignSelf: "center",
    // marginTop: 15
  },
  walletAmountText: {
    fontSize: RFValue(20, 414),
    left: "40%",
  },
  midContainer: { justifyContent: "center" },
  container: {
    backgroundColor: "#0000",
  },
  inputAnimatableView: {
    paddingTop: 30,
  },
  button: {
    zIndex: 4,
    shadowColor: "#6C6C6C",
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: globalColors.orange,
    borderRadius: 30,
    alignSelf: "center",
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    marginTop: 20,
  },
  buttonTransparent: {
    zIndex: 4,
    // shadowColor: "#6C6C6C",
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: "#0000",
    borderRadius: 30,
    alignSelf: "center",
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    marginTop: 20,
    borderWidth: 1,
  },
  buttontext: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 45,
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    paddingHorizontal: RFValue(5, 414),
    marginTop: RFValue(2.5, 414),
    marginBottom: RFValue(5, 414),
  },
  mainText: {
    textAlign: "center",
    alignSelf: "center",
    color: "#FFFFFF",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    // paddingHorizontal: 10,
    // marginTop: 30
    width: widthPercentageToDP(60),
  },
  dollar: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(12.5, 414),
  },

  inputtext: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(15.5 / PixelRatio.getFontScale(), 414),
    color: "#FF9D00",
    alignSelf: "center",
    textAlign: "center",
  },
  labeltext: {
    // flex: 0,
    fontFamily: "montserrat-regular-english",
    fontSize: 18,
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    position: "absolute",
    left: "22%",
    // top: 5
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 25,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    paddingVertical: 10,
    width: 230,
    // height: 45,
    color: "#fff",
    textAlign: "center",
  },
  BlurView: {
    height: "100%",
  },
  subHeading: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-light",
    marginVertical: 20,
    width: widthPercentageToDP(50),
  },
  loader: {
    color: globalColors.orange,
    left: "20%",
    top: 5,
  },
  topUpHistory: {
    color: "#FFFFFF",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9, 414),
    paddingHorizontal: RFValue(15, 414),
    paddingVertical: RFValue(5, 414),
    textAlign: "left",
  },
  amountLabelView: {
    width: 150,
    height: 15,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingTop: 5,
    zIndex: 10,
    borderTopLeftRadius: 85,
    borderTopRightRadius: 85,
  },
  amountLabelText: {
    textAlign: "center",
    fontSize: RFValue(6, 414),
    color: "#FFF",
    fontFamily: "montserrat-bold",
    marginBottom: RFValue(-5, 414),
  },
  contentScrollView: { paddingHorizontal: 15 },
  listLoader: {
    marginTop: 30,
    alignSelf: "center",
  },
  modalWalletIcon: {
    marginTop: 50,
  },
});

export default styles;
