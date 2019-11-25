import { StyleSheet, Platform, PixelRatio, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    marginTop: 0,
    flex: 1,
    width: "100%"
    // width: "96%"
  },
  contentContainer: {
    flex: 1
  },
  appInstallContent: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "space-around",
    paddingHorizontal: 40
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-bold",
    fontSize: 16,
    paddingVertical: 0
  },
  deepLinkContainer: {
    flex: 1,
    width: "100%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  deepLinkHeader: {
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "android" ? 10 : 0
  },
  longFormVideoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30
  },
  longFormVideoContent: {
    flexDirection: "column",
    paddingTop: 30
  },
  videoSelectButton: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    marginVertical: 10,
    borderRadius: 30
  },
  subtext: {
    bottom: 5,
    alignSelf: "center",
    width: 300,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingTop: 5,
    color: "#fff",
    paddingHorizontal: 20,
    textAlign: "center"
  },
  subtextReach: {
    bottom: 5,
    alignSelf: "center",
    width: 300,
    fontFamily: "montserrat-bold",
    fontSize: 18,
    lineHeight: 22,
    paddingTop: 5,
    color: "#fff",
    paddingHorizontal: 20,
    textAlign: "center"
  },
  url: {
    alignSelf: "center",
    fontFamily: "montserrat-light-english",
    fontSize: 13,
    color: "#fff",
    paddingRight: 20
    // textAlign: "left"
  },
  subTitle: {
    bottom: 5,
    alignSelf: "center",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingTop: 5,
    color: "#fff",
    paddingHorizontal: 20,
    textAlign: "center"
  },
  addVideoText: {
    alignSelf: "center",
    fontSize: 14,
    paddingTop: 5,
    textAlign: "center",
    color: "#FF9D00",
    position: "absolute",
    top: "70%",
    fontFamily: "montserrat-bold"
  },
  safeAreaContainer: {
    // height: '100%',
    flex: 1
    // backgroundColor: '#FFFF',
  },
  warningText: {
    color: "#fff",
    textAlign: "center",
    top: 10,
    fontFamily: "montserrat-bold",
    fontSize: 13
  },
  listText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    width: 170
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    paddingBottom: 0,
    paddingTop: 30,
    textDecorationLine: "underline",
    textAlign: "center"
  },
  textcontainer: {
    flexDirection: "column",
    alignItems: "center"
  },
  appTexts: {
    alignSelf: "center",
    fontFamily: "montserrat-medium",
    fontSize: widthPercentageToDP(3.2),
    marginBottom: 6,
    color: "#fff",
    textAlign: "center"
  },
  video: {
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 30,
    alignItems: "center"
  },
  placeholder: {
    borderRadius: 13,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: 150,
    zIndex: 0,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#fff",
    justifyContent: "center"
  },
  text: {
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    alignSelf: "center"
  },
  downArrowIcon: {
    color: "#fff",
    fontSize: 20,
    left: 0
  },
  deepLinkError: {
    color: "white",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    alignSelf: "center"
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.2)",
    // paddingHorizontal: 10,
    borderRadius: 150,
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: widthPercentageToDP(75),
    borderWidth: 0,
    height: 54
  },
  inputtext: {
    fontFamily: "montserrat-light-english",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    color: "#fff"
  },
  callActionLabel: {
    fontFamily: "montserrat-light-english",
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    flex: 1
  },
  websiteContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  whatsApp: {
    // minHeight: '100%',
    // backgroundColor: 'transparent',
    // flex: 1,
    flexDirection: "column",
    // justifyContent: 'space-around',
    // justifyContent: 'space-evenly',
    alignItems: "center",
    // bottom: "5%",
    paddingTop: 20
  },
  whatsAppDetailContainer: {
    paddingTop: 20
    // minHeight: '100%',
    // justifyContent: 'space-around',
    // flex: 1,
  },
  marginVertical: {
    marginVertical: 10
  },
  title: {
    textAlign: "center",
    color: "white",
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 16
  },
  previewButtonContainer: {
    paddingVertical: 40
  },
  videoPreviewView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  videoStyle: {
    width: "100%",
    minHeight: 200,
    alignSelf: "center"
    //   flex: 1
    // marginTop: 30
    // height: 300
  },
  safeAreaViewLongFormVideoPreview: {
    paddingTop: 10
  },
  bottonViewWebsite: {
    marginBottom: 10
  },
  netLocStyle: {
    backgroundColor: "#5D1CD8",
    borderRadius: 10,
    // marginRight: 50,
    borderColor: "#5D1CD8",
    // width: "100%",
    width: widthPercentageToDP(20),
    height: 40
  },
  icon: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#fff"
    // paddingLeft: 10
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#FF9D00"
  },
  optionsContainer: {
    flexDirection: "column",
    paddingTop: 20
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center"
    // paddingBottom: 20
  },
  optionsIconSize: {
    fontSize: 25
  },
  optionsTextContainer: {
    textAlign: "center",
    paddingLeft: 10
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: -10,
    marginTop: I18nManager.isRTL ? -5 : 0
  },
  topContainer: {
    // paddingBottom: 30,
    // paddingTop: widthPercentageToDP(5) > 10 ? 30 : 0,
    paddingVertical: 30,
    // paddingHorizontal: 10,
    width: widthPercentageToDP(75),
    // width: 300,
    flexDirection: "row",
    alignSelf: "center"
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
  },
  collectionAdLinkForm2: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 40,
    borderTopEndRadius: 40
  },
  collectionAdLinkForm1: {
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 40,
    borderTopStartRadius: 40
  },
  activeButton: {
    backgroundColor: "#FF9D00",
    height: 50,
    // width: 150,
    width: "50%",
    justifyContent: "center",
    flexDirection: "column"
  },
  inactiveText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center",
    textTransform: "uppercase"
  },
  activeText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#fff",
    textAlign: "center",
    textTransform: "uppercase"
  },
  button2: {
    backgroundColor: "rgba(0,0,0,0.2)",
    // width: 150,
    width: "50%",
    height: 50,
    justifyContent: "center",
    flexDirection: "column"
  },
  inputContainer: {
    flexDirection: "row",
    // width: '100%',
    width: widthPercentageToDP(75),
    justifyContent: "center",
    alignSelf: "center"
  },
  websiteView: {
    alignItems: "center",
    width: "100%"
  },
  websiteLabelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  networkLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    // flex: 1,
    // paddingLeft: 20,
    top: 2
    // right: 4,
  },
  callToActionLabelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  businessInputText: {
    fontFamily: "montserrat-bold",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    color: "#FF9D00"
  },
  scrollViewContainer: {
    // paddingLeft: 20,
    flexGrow: 1,
    paddingBottom: heightPercentageToDP(35)
  },
  businessNameView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  BlurView: {
    zIndex: 10,
    height: "100%"
  },
  walletPaymentModalContainer: {
    height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  walletButton: {
    backgroundColor: "#FF9D00",
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
    alignSelf: "center",
    justifyContent: "center"
  },
  colorWhite: {
    color: "#fff"
  },
  instagramWarningHeadingText: {
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "montserrat-bold",
    paddingVertical: 20,
    // paddingHorizontal: 60,
    width: widthPercentageToDP(50)
  },
  instagramWarningDescriptionText: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#FFF",
    fontFamily: "montserrat-regular",
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: widthPercentageToDP(85)
  }
});

export default styles;
