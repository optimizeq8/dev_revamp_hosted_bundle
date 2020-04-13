import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: { flex: 1, backgroundColor: "#FFF" },
  personalInfoIcon: {
    alignSelf: "center",
    marginTop: 20
  },
  dataContainer: {
    paddingHorizontal: 35,
    paddingTop: 20,
    alignItems: "center"
  },
  nameText: {
    color: "#5F5F5F",
    fontFamily: "montserrat-medium",
    fontSize: 23,
    textAlign: "left",
    paddingBottom: 60
  },
  itemMobileNo: {
    marginBottom: 30
  },
  labelMobileNo: {
    fontSize: 14 / PixelRatio.getFontScale()
  },
  labelEmail: {
    bottom: 5,
    // alignSelf: "center",
    fontSize: Platform.OS === "android" ? 14 / PixelRatio.getFontScale() : 14
  },
  mainCard: {
    flex: 1
  },
  button: {
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  contentContainer: {
    paddingVertical: 20,
    justifyContent: "space-around"
  },
  label: {
    color: "#FF9D00",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    textAlign: "left"
  },
  inputText: {
    fontFamily: "montserrat-regular-english",
    textAlign: I18nManager.isRTL ? "right" : "left",
    fontSize: 21 / PixelRatio.getFontScale(),
    color: "#4B4B4B"
  },
  input: {
    // bottom: 25,
    marginBottom: 10,
    // alignSelf: "center",
    // width: "90%",
    // height: 45,
    borderColor: "#7039FF"
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
  fullNameView: {
    width: "100%"
  },
  phoneInput: {
    borderRadius: 0,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    paddingBottom: 10,
    marginTop: 10
  },
  mobileView: {
    width: "100%",
    marginBottom: 30
  },
  emailItem: { width: "100%", marginTop: 25 },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#FFF",
    textAlign: "center",
    textTransform: "uppercase",
    marginBottom: -3
  },
  labelView: {
    height: 15,
    width: 150,
    alignSelf: "center",
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 2,
    marginBottom: 0,
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  flagIcon: {
    fontSize: 12,
    paddingLeft: 0,
    paddingRight: 0
  },
  flagStyle: {
    height: 15
  },
  stepNoView: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 20,
    borderColor: "#C6C6C6"
  },
  stepNoText: {
    fontFamily: "montserrat-regular",
    fontSize: 10,
    color: "#C6C6C6"
  },
  stepNameText: {
    fontFamily: "montserrat-regular",
    fontSize: 8,
    color: "#C6C6C6"
  },
  horzintalLine: {
    borderWidth: 0.5,
    borderColor: "#C6C6C6",
    width: 30,
    alignSelf: "center",
    marginTop: -10
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35
  },
  whatsAppDetailContainer: {
    paddingTop: 20,
    paddingBottom: "30%"
    // minHeight: '100%',
    // justifyContent: 'space-around',
    // flex: 1,
  },
  marginVertical: {
    marginVertical: 10
  },
  callToActionLabelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 4,
    marginBottom: 0,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  createWebsiteText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#FFF",
    width: widthPercentageToDP(75),
    textAlign: "center"
  },
  bottonViewWebsite: {
    marginBottom: 10,
    alignSelf: "flex-end",
    left: -10
  },
  itemView: {
    width: 25,
    borderRadius: 30,
    height: 25,
    marginBottom: -15,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    alignSelf: "flex-end",
    justifyContent: "center"
  },
  itemFoundText: {
    textAlign: "center",
    color: "#FFF"
  },
  itemProductView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    // marginHorizontal: "auto",
    paddingHorizontal: 8,
    alignSelf: "flex-start"
  },
  imageProduct: {
    width: 95,
    height: 95,
    borderRadius: 20
  },
  viewMoreText: {
    fontFamily: "montserrat-bold",
    color: "#FFF",
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 60,
    marginBottom: 20
  },
  submitText: {
    fontFamily: "montserrat-bold",
    color: "#FFF",
    fontSize: 14,
    lineHeight: 18
  },
  registerSuccessIcon: {
    marginLeft: I18nManager.isRTL
      ? widthPercentageToDP(-5)
      : widthPercentageToDP(-55),
    marginTop: heightPercentageToDP(5)
  },
  successText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#FFF",
    textAlign: "left"
  },
  registerCompleteText: {
    fontFamily: "montserrat-bold",
    fontSize: 27,
    color: "#FFF",
    textAlign: "left",
    paddingTop: 10,
    textTransform: "uppercase"
  },
  yourLinkText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#FFF",
    textAlign: "center",
    paddingVertical: 10,
    textTransform: "uppercase"
  },
  getStartedBtn: {
    height: 54,
    marginHorizontal: 0
  },

  mainView: {
    display: "flex",
    paddingHorizontal: 30,
    paddingTop: 10,
    flexDirection: "column"
  },
  businessNameView: {
    flexDirection: "column",
    padding: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 70,
    marginBottom: 20
  },
  websiteUrl: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    lineHeight: 19,
    color: globalColors.orange,
    textAlign: "center"
  },
  tapCopyText: {
    fontFamily: "montserrat-regular",
    fontSize: 13,
    color: globalColors.white,
    textAlign: "center"
  },
  activeStepView: {
    borderColor: "#4CA2E0"
  },
  activeStepText: {
    color: "#4CA2E0",
    fontFamily: "montserrat-bold"
  },
  headerText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#4CA2E0",
    textTransform: "uppercase"
  },
  badgeView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  outerView: {
    flex: 1,
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    marginTop: -110,
    overflow: "hidden",
    paddingHorizontal: 20,
    paddingTop: 20
  },
  onlineStoreHomeIcon: {
    left: -10
  },
  list: {
    // paddingTop: 20
    // display: "flex",
    // flexGrow: 1,
    // justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 30
  },
  submitProducts: {
    width: "70%",
    height: 40,
    marginHorizontal: 60,
    alignSelf: "center",
    marginBottom: 30
  },
  headerCardView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  badgeViewInner: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  changeLogoText: {
    textAlign: "center",
    fontSize: 11,
    fontFamily: "montserrat-regular",
    color: globalColors.orange,
    paddingHorizontal: 5
  },
  instagramErrorText: {
    paddingTop: 12,
    paddingHorizontal: 50,
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: "#fff",
    textAlign: "center"
  }
});

export default styles;
