import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0000",
  },
  walletIcon: {
    alignSelf: "center",
    // marginTop: 15
  },
  walletAmountText: {
    fontSize: 40,
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
    width: 250,
    height: 50,
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
    width: 250,
    height: 50,
    marginTop: 20,
    borderWidth: 1,
  },
  buttontext: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14,
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
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  mainText: {
    textAlign: "center",
    alignSelf: "center",
    color: "#FFFFFF",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    // paddingHorizontal: 10,
    // marginTop: 30
    width: widthPercentageToDP(60),
  },
  dollar: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 25,
  },

  inputtext: {
    fontFamily: "montserrat-bold-english",
    fontSize: 31 / PixelRatio.getFontScale(),
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
    fontSize: 18,
    paddingHorizontal: 30,
    paddingVertical: 10,
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
    fontSize: 12,
    color: "#FFF",
    fontFamily: "montserrat-bold",
    marginBottom: -10,
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
