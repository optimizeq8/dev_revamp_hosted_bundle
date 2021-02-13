import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35,
  },

  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-regular",
    paddingBottom: 20,
  },

  mainButtonView: {
    // flex: 1,
    justifyContent: "flex-start",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#FFF",
    paddingBottom: "10%",
  },
  helloNameStyle: {
    textTransform: "uppercase",
    fontSize: RFValue(14, 414),
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    paddingTop: 0,
  },
  accountNotVerifiedText: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
  },
  verifyAccountText: {
    fontSize: 14,
    textAlign: "center",
    color: globalColors.orange,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    paddingBottom: 20,
  },

  mainText: {
    textAlign: "left",
    fontSize: RFValue(10.5, 414),
    color: "#FFF",
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    width: "60%",
  },
  logo: {
    alignSelf: "center",
    bottom: 20,
  },
  flex: {
    justifyContent: "center",
  },
  flex1: {
    flex: 1,
  },
  getStartedText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9.5, 414),
    textTransform: "uppercase",
    color: "#575757",
    textAlign: "center",
    marginTop: 20,
  },
  lowerButton: {
    alignSelf: "flex-end",
    position: "absolute",
    width: RFValue(20, 414),
    height: RFValue(20, 414),
    bottom: heightPercentageToDP(2),
    right: 5,
  },
  onlineStoreHomeIcon: {
    left: widthPercentageToDP(-12),
    marginBottom: heightPercentageToDP(-6),
  },
  launchCampaignIcon: {
    left: widthPercentageToDP(-20),
    marginBottom: heightPercentageToDP(-11),
  },
  socialPlatformIconView: {
    flexDirection: "row",
    alignSelf: "flex-end",
    position: "absolute",
  },
  snapchatIcon: {
    right: widthPercentageToDP(-10),
  },
  googleIcon: {
    right: widthPercentageToDP(2),
  },
  instagramIcon: {
    right: widthPercentageToDP(7),
    top: 25,
  },

  campaignCreateCard: {
    paddingTop: RFValue(10, 414),
    borderRadius: 35,
    paddingHorizontal: RFValue(10, 414),
    overflow: "hidden",
    marginBottom: RFValue(5, 414),
    marginTop: RFValue(5, 414),
    marginHorizontal: RFValue(10, 414),
  },
  websiteCard: {
    marginHorizontal: RFValue(10, 414),
    marginBottom: RFValue(10, 414),
    marginTop: RFValue(5, 414),
    paddingTop: RFValue(10, 414),
    borderRadius: 35,
    overflow: "hidden",
    paddingHorizontal: RFValue(10, 414),
  },
});
