import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    top: 5,
    backgroundColor: "#0000"
  },
  mainView: {
    justifyContent: "center",
    zIndex: 10,
    height: 10,
    top: 13,
    zIndex: 100,
    elevation: 10,
    backgroundColor: "#0000",
    width: "100%"
  },
  lottieView: {
    left: 5,
    // width: wp(5),
    height: heightPercentageToDP(5),
    position: "absolute"
  },
  animateView: {
    zIndex: 1,
    height: "100%"
  },
  sideMenuCard: {
    flexDirection: "row",
    alignItems: "flex-end",
    left: 20,
    marginBottom: 5
  },
  sideMenuTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around"
  },
  newCampaignTitle: {
    paddingTop: 0,
    fontSize: 12
  },
  menuContainer: {
    alignSelf: "center",
    width: "100%",
    position: "absolute"
  },
  flatlistContainerStyle: {
    paddingBottom: heightPercentageToDP(35)
  },
  footerActivityIndicator: { margin: 15 },
  campaignButtonText: {
    textAlign: "center",
    color: "#C6C6C6",
    fontFamily: "montserrat-regular",
    fontSize: 16,
    top: I18nManager.isRTL ? 3 : 5
  },
  adButtonText: {
    textAlign: "center",
    color: "#C6C6C6",
    fontFamily: "montserrat-regular-english",
    fontSize: 16,
    top: 20
  },
  container: { backgroundColor: "#0000", bottom: 5 },
  media: {
    alignSelf: "center",
    height: heightPercentageToDP(10),
    width: heightPercentageToDP(15),
    bottom: heightPercentageToDP(3.5)
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50
  },
  mainCard: {
    backgroundColor: "#F4F4F4",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    width: "100%",
    height: "100%",
    bottom: 20
  },
  backDrop: {
    position: "absolute",
    // top: -heightPercentageToDP("45%"),
    top: heightPercentageToDP(5) < 40 ? -240 : -210,
    alignSelf: "center",
    zIndex: -1,
    elevation: -2
  },
  logoutIcon: {
    zIndex: 20,

    left: widthPercentageToDP("85%")
  },
  icons: {
    color: "#fff",
    paddingHorizontal: 17,
    paddingBottom: heightPercentageToDP(5) < 40 ? 0 : 12
  },
  text: {
    alignSelf: "center",
    color: "#5F5F5F",
    fontFamily: "montserrat-bold",
    fontSize: 14
    // top: 4
  },
  brandStyle: {
    alignSelf: "center",
    maxWidth: "80%",
    color: "#5F5F5F",
    textAlign: "center",
    fontFamily: "montserrat-regular",
    fontSize: 12
  },
  nameStyle: {
    top: 5,
    alignSelf: "center",
    maxWidth: "75%",
    minWidth: "50%",
    height: 55,
    color: "#5F5F5F",
    fontFamily: "montserrat-bold",
    fontSize: 21,
    backgroundColor: "#F4F4F4",
    borderRadius: 30,
    paddingTop: 10,
    paddingHorizontal: 30
  },
  buttontext: {
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  button: {
    // marginBottom: 10,
    justifyContent: "center",
    backgroundColor: globalColors.orange,
    // marginHorizontal: 20,
    width: 60,
    height: 60,
    borderRadius: 33,
    elevation: 0,
    shadowColor: "#6C6C6C",
    shadowRadius: 4,
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 3 }
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#5F5F5F",
    fontFamily: "montserrat-regular",
    fontSize: 20
  },
  bottomCard: {
    top: 15,
    backgroundColor: "#fff",
    shadowColor: "#6C6C6C",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: 100
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },

  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 7
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingVertical: 0
  },
  subtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingTop: 25,
    color: "#fff",
    textAlign: "center"
  },
  Text: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: "#FF9D00",
    padding: 10,
    marginBottom: 20,
    bottom: 15
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 40,
    paddingVertical: 10,
    paddingHorizontal: 7
  },
  contentContainer: {
    paddingTop: 30
  },
  // checkbutton: {
  //   backgroundColor: "#FF9D00",
  //   alignSelf: "center",
  //   width: 55,
  //   height: 55,
  //   borderRadius: 27.5,
  //   borderColor: "transparent",
  //   borderWidth: 1,
  //   alignItems: "center",
  //   justifyContent: "flex-end",
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 3 },
  //   shadowRadius: 3,
  //   shadowOpacity: 0.2,
  //   marginVertical: 5
  // },
  activebutton: {
    backgroundColor: "#0000",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 33,
    // top: 30,
    // marginBottom: 10,
    elevation: 0
  },
  dateInput: {
    marginBottom: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    alignSelf: "center",
    width: 270,
    height: 65,
    justifyContent: "center"
  },
  categories: {
    textAlign: "center",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingHorizontal: 10
  },
  dateModal: {
    ...StyleSheet.absoluteFillObject,
    height: heightPercentageToDP("100%"),
    marginTop: 0
  },
  wallet: {
    // top: "50%",
    right: "5%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  },
  placeHolderCardsStyle: {
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 150,
    width: "90%",
    marginHorizontal: 20,
    borderRadius: 30,
    marginVertical: 8,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#6268FF",
    shadowOffset: { height: 6, width: 0 },
    elevation: 5
  },
  snapAd: {
    top: 10,
    justifyContent: "center",
    backgroundColor: globalColors.white,
    marginHorizontal: 10,
    width: 50,
    height: 50,
    borderRadius: 50
  },
  background: {
    position: "absolute",
    opacity: 0.4,
    top: 230,
    alignSelf: "center"
  }
});

export default styles;
