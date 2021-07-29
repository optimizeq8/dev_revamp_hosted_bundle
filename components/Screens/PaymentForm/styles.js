import { StyleSheet, PixelRatio } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    // backgroundColor: "#0000"
    backgroundColor: globalColors.bluegem,
  },
  contentStyle: { flex: 1, backgroundColor: "#0000" },
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
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-regular",
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
    height: RFValue(25, 414),
    width: RFValue(65, 414),
    marginHorizontal: 0,
    borderRadius: 30,
    justifyContent: "center",
  },
  flexBoxRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: RFValue(5, 414),
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6.5, 414),
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(5, 414),
  },
  link: {
    textAlign: "left",
    fontFamily: "montserrat-light",
    fontSize: RFValue(6, 414),
    lineHeight: 20,
  },
  walletInfo: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7.5, 414),
    paddingHorizontal: RFValue(5, 414),
    paddingVertical: RFValue(2.5, 414),
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
    paddingHorizontal: RFValue(10, 414),
  },
  bottomCardBlock1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 0,
    height: "50%",
  },
  bottomCardBlock2: {
    width: "100%",
    paddingTop: 5,
    zIndex: 5,
    top: "25%",

    paddingHorizontal: 20,
  },
  walletButton: {
    marginTop: RFValue(7.5, 414),

    width: RFValue(125, 414),
    height: RFValue(25, 414),
    alignSelf: "center",
    justifyContent: "center",
  },
  buttontext: {
    color: "#fff",
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-bold",
  },
  whitebutton: {
    marginHorizontal: 0,
    alignSelf: "center",
    justifyContent: "center",
    height: RFValue(35, 414),
  },
  whitebutton2: {
    marginHorizontal: 0,
    justifyContent: "center",
    height: RFValue(35, 414),
    // width: 100,
  },
  whitebutton3: {
    marginHorizontal: 0,
    alignSelf: "center",
    justifyContent: "center",
    height: RFValue(35, 414),
  },
  whitebuttontext: {
    color: "rgba(255,255,255,0.6)",
    fontSize: RFValue(8, 414),
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
    fontSize: RFValue(11.5, 414),
    fontFamily: "montserrat-bold-english",
  },
  optimizeFeesTextContainer: {
    flexDirection: "row",
    paddingTop: RFValue(5, 414),
  },
  optimizeFeesText: {
    color: "#C6C6C6",
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-regular",
    textAlign: "left",
  },
  payNowText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: RFValue(8, 414),
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
    fontSize: RFValue(8, 414),
    paddingRight: 2,
  },
  kdAmountContainer: {
    flexDirection: "row",
    paddingTop: 2,
  },
  kdText: {
    fontSize: RFValue(4.5, 414),
    fontFamily: "montserrat-bold-english",
    paddingRight: 2,
  },
  kdAmountText: {
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-bold-english",
  },
  mastercardImage: {
    width: 250,
  },
  walletPaymentModalContainer: {
    // height: "100%",
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  reviewPurchaseText: {
    fontSize: RFValue(10, 414),
    fontFamily: "montserrat-bold",
  },
  useWalletText: {
    fontSize: RFValue(10, 414),
    fontFamily: "montserrat-bold",
  },
  colorWhite: {
    fontFamily: "montserrat-regular",
    color: "#FFFF",
    fontSize: RFValue(7, 414),
  },
  walltetAmountText: {
    fontSize: RFValue(12.5, 414),
  },
  optimizeFeesAmountText: {
    color: "#C6C6C6",
    fontSize: RFValue(6, 414),
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
  warningLoadmessage: {
    color: globalColors.white,
    fontSize: RFValue(7, 414),
    lineHeight: 18,
    textTransform: "uppercase",
    textAlign: "center",
    fontFamily: "montserrat-bold",
  },
  paymentMethodView: {
    backgroundColor: "rgba(0,0,0,0.15)",
    paddingHorizontal: RFValue(7.5, 414),
    paddingVertical: RFValue(5, 414),
    borderRadius: RFValue(12.5, 414),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: RFValue(7.5, 414),
  },
  paymentMethodText: {
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-bold",
    color: "#FFF",
  },
  paymentMethodSubText: {
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-regular",
    color: "#FFF",
  },
  radioButtonOuterView: {
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    borderRadius: RFValue(15, 414),
    backgroundColor: "rgba(0,0,0,0.26)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  radioButtonInnerView: {
    width: RFValue(11, 414),
    height: RFValue(11, 414),
    borderRadius: RFValue(11, 414),
    backgroundColor: "#FF9D00",
  },
});

export default styles;
