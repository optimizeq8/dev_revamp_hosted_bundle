import { StyleSheet, PixelRatio } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: { flex: 1, backgroundColor: "#0000" },
  contentStyle: { flex: 1, backgroundColor: "#0000" },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  knetContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mastercardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#0000",
    // marginBottom: "13%",
  },
  buttonGroupBlock: {
    flexDirection: "row",
    marginTop: 20,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 40,
  },
  errortext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-light",
    textAlign: "center",
    lineHeight: 18,
  },
  media: {
    alignSelf: "center",
    width: heightPercentageToDP(5) < 30 ? 100 : 200,
    height: heightPercentageToDP(5) < 30 ? 100 : 200,
  },
  BlurView: {
    zIndex: 10,
    height: "100%",
  },
  mainCard: {
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: 50,
    width: heightPercentageToDP(5) < 30 ? 150 : 160,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 30,
    justifyContent: "center",
  },
  flexBoxRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  backDrop: {
    position: "absolute",
    top: -275,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
  },
  boldtext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    alignSelf: "center",
  },

  snapbutton: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  link: {
    textAlign: "left",
    fontFamily: "montserrat-light",
    fontSize: 12,
    lineHeight: 20,
  },
  walletInfo: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  header: {
    fontFamily: "montserrat-medium",
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    paddingRight: 10,
  },
  headerview: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  bottomCard: {
    // display: "flex",
    flexDirection: "column",
    backgroundColor: "#0000",
    borderTopColor: "#0000",
    minHeight: 150,
    alignItems: "center",
    elevation: 0,
    width: "100%",
    paddingHorizontal: 20,
  },
  bottomCardBlock1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 0,
  },
  bottomCardBlock2: {
    width: "100%",
    paddingTop: 5,
    zIndex: 5,
    top: "25%",

    paddingHorizontal: 20,
  },
  button: {
    borderWidth: 0.3,
    borderColor: "#fff",
    marginTop: 15,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center",
  },
  walletButton: {
    marginTop: 15,

    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  buttontext: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-bold",
  },
  whitebutton: {
    marginHorizontal: 0,
    alignSelf: "center",
    justifyContent: "center",
    height: 70,
  },
  whitebutton2: {
    marginHorizontal: 0,
    justifyContent: "center",
    height: 70,
    width: 100,
  },
  whitebutton3: {
    marginHorizontal: 0,
    alignSelf: "center",
    justifyContent: "center",
    height: 70,
  },
  whitebuttontext: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    fontFamily: "montserrat-bold",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  colorOrange: {
    color: "#FF8D04",
  },
  money: {
    color: "#C6C6C6",
    textAlign: "center",
    fontSize: 21,
    fontFamily: "montserrat-bold",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  optimizeFeesTextContainer: { flexDirection: "row", paddingTop: 10 },
  optimizeFeesText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textAlign: "left",
  },
  payNowText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "montserrat-bold",
  },
  tNcText: {
    textDecorationLine: "underline",
    color: "#C6C6C6",
    fontFamily: "montserrat-bold",
  },
  dollarAmountContainer: {
    flexDirection: "row",
  },
  dollarAmountText: {
    fontSize: 16,
    paddingRight: 2,
  },
  kdAmountContainer: {
    flexDirection: "row",
    paddingTop: 2,
  },
  kdText: {
    fontSize: 9,
    fontFamily: "montserrat-bold",
    paddingRight: 2,
  },
  kdAmountText: {
    fontSize: 13,
    fontFamily: "montserrat-bold",
  },
  mastercardImage: {
    width: 250,
  },
  errorTextKNET: {
    fontFamily: "montserrat-bold",
  },
  walletPaymentModalContainer: {
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  reviewPurchaseText: {
    fontSize: 20,
    fontFamily: "montserrat-bold",
  },
  useWalletText: {
    fontSize: 20,
    fontFamily: "montserrat-bold",
  },
  colorWhite: {
    fontFamily: "montserrat-regular",
    color: "#FFFF",
    fontSize: 14,
  },
  walltetAmountText: {
    fontSize: 25,
  },
  optimizeFeesAmountText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    paddingRight: 2,
  },
  transaprentButton: {
    borderColor: globalColors.white,
    borderWidth: 1,
  },
  curvedCard: {
    backgroundColor: "#fff",
    height: "19%",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
});

export default styles;
