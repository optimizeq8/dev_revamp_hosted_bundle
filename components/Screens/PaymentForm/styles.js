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
    justifyContent: "center"
  },
  mastercardContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  container: {
    backgroundColor: "#0000"
    // flex: 1,
    // height: "100%",
    // width: "100%"
  },
  buttonGroupBlock: {
    flexDirection: "row",
    marginHorizontal: 40,
    marginTop: 20,
    alignSelf: "center"
  },
  errortext: {
    // marginTop: 5,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-light",
    textAlign: "center",
    lineHeight: 18
  },
  media: {
    // top: "10%",
    alignSelf: "center",
    // height: heightPercentageToDP(20),
    // width: heightPercentageToDP(20)
    width: heightPercentageToDP(5) < 30 ? 100 : 200,
    height: heightPercentageToDP(5) < 30 ? 100 : 200
  },
  BlurView: {
    zIndex: 10,
    height: "100%"
  },
  mainCard: {
    // top: 20,
    // borderColor: "#FF9D00",
    backgroundColor: "#FF9D00",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: 45,
    width: heightPercentageToDP(5) < 30 ? 150 : 160,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 30,
    justifyContent: "center"
  },
  backDrop: {
    position: "absolute",
    top: -275,
    alignSelf: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center"
  },
  boldtext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    alignSelf: "center"
  },

  snapbutton: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  link: {
    textAlign: "left",
    // alignSelf: "flex-start",
    // bottom: 10,
    color: "#C6C6C6",
    fontFamily: "montserrat-light",
    fontSize: 12,
    // paddingHorizontal: 10,
    lineHeight: 20
  },
  walletInfo: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    fontFamily: "montserrat-medium",
    // paddingHorizontal: 50,
    // paddingVertical: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    alignSelf: "center",
    paddingRight: 10
  },
  headerview: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    paddingVertical: 20
  },
  bottomCard: {
    // top: 15,
    display: "flex",
    flexDirection: "column",
    borderColor: "#FFF",
    // justifyContent: "center",
    backgroundColor: "#FFF",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    minHeight: 170,
    alignItems: "center",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderTopWidth: 0,
    width: "100%",
    paddingHorizontal: 20
  },
  bottomCardBlock1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 0
  },
  bottomCardBlock2: { width: "100%", paddingTop: 5 },
  button: {
    borderWidth: 0.3,
    borderColor: "#fff",
    marginTop: 15,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center"
  },
  walletButton: {
    backgroundColor: globalColors.orange,
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 20,

    alignSelf: "center",
    justifyContent: "center"
  },
  buttontext: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-medium"
  },
  whitebutton: {
    // marginTop: 15,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 0,
    borderTopStartRadius: 25,
    borderBottomStartRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
    // paddingVertical: 20,
    height: 50,
    width: 100
  },
  whitebutton2: {
    // marginTop: 15,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 0,
    // borderTopEndRadius: 15,
    // borderBottomEndRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 50,
    width: 100

    // paddingVertical: 20
  },
  whitebutton3: {
    // marginTop: 15,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 0,
    borderTopEndRadius: 25,
    borderBottomEndRadius: 25,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 0
    // width: 125

    // paddingVertical: 20
  },
  whitebuttontext: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 16,
    fontFamily: "montserrat-bold",
    textAlign: "center"
  },
  colorOrange: {
    color: "#FF9D00"
  },
  money: {
    color: "#C6C6C6",
    textAlign: "center",
    fontSize: 21,
    fontFamily: "montserrat-bold"
    // paddingTop: 3
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  optimizeFeesTextContainer: { flexDirection: "row", paddingTop: 10 },
  optimizeFeesText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textAlign: "left"
  },
  payNowText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "montserrat-bold"
    //   paddingBottom: 3
  },
  tNcText: {
    textDecorationLine: "underline",
    color: "#C6C6C6",
    fontFamily: "montserrat-bold"
  },
  dollarAmountContainer: {
    flexDirection: "row"
    // alignItems: 'baseline',
  },
  dollarAmountText: {
    fontSize: 16,
    paddingRight: 2
  },
  kdAmountContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    paddingTop: 2
    // alignItems: 'baseline',
  },
  kdText: {
    fontSize: 9,
    fontFamily: "montserrat-bold",
    paddingRight: 2
  },
  kdAmountText: {
    fontSize: 13,
    fontFamily: "montserrat-bold"
  },
  mastercardImage: {
    width: 250
  },
  errorTextKNET: {
    fontFamily: "montserrat-bold"
  },
  walletPaymentModalContainer: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  reviewPurchaseText: {
    fontSize: 20,
    fontFamily: "montserrat-bold"
  },
  useWalletText: {
    fontSize: 20,
    fontFamily: "montserrat-bold"
  },
  colorWhite: {
    fontFamily: "montserrat-regular",
    color: "#FFFF"
  },
  walltetAmountText: {
    fontSize: 25
  },
  optimizeFeesAmountText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    paddingRight: 2
  }
});

export default styles;
