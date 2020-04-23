import { StyleSheet } from "react-native";

import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 35
  },

  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    paddingBottom: 20
  },

  mainButtonView: {
    // flex: 1,
    justifyContent: "flex-start",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#FFF",
    paddingBottom: "10%"
  },
  helloNameStyle: {
    textTransform: "uppercase",
    fontSize: 28,
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    paddingTop: 0
  },
  accountNotVerifiedText: {
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular"
  },
  verifyAccountText: {
    fontSize: 14,
    textAlign: "center",
    color: globalColors.orange,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    textDecorationLine: "underline",
    paddingBottom: 20
  },

  mainText: {
    textAlign: "left",
    fontSize: 21,
    color: "#FFF",
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    width: "60%"
  },
  logo: {
    alignSelf: "center",
    bottom: 20
  },
  flex: {
    justifyContent: "center"
  },
  flex1: {
    flex: 1
  },
  getStartedText: {
    fontFamily: "montserrat-bold",
    fontSize: 19,
    textTransform: "uppercase",
    color: "#575757",
    textAlign: "center",
    marginTop: 20
  },
  lowerButton: {
    alignSelf: "flex-end",
    position: "absolute",
    width: 40,
    height: 40,
    bottom: heightPercentageToDP(2),
    right: 5
  },
  onlineStoreHomeIcon: {
    left: widthPercentageToDP(-12),
    marginBottom: heightPercentageToDP(-6)
  },
  launchCampaignIcon: {
    left: widthPercentageToDP(-20),
    marginBottom: heightPercentageToDP(-11)
  },
  socialPlatformIconView: {
    flexDirection: "row",
    alignSelf: "flex-end",
    position: "absolute"
  },
  snapchatIcon: {
    right: widthPercentageToDP(-20)
  },
  googleIcon: {
    right: -30
  },
  campaignCreateCard: {
    paddingTop: 20,
    borderRadius: 35,
    paddingHorizontal: 20,
    overflow: "hidden",
    marginBottom: 10,
    marginTop: 10,
    marginHorizontal: 20
  },
  websiteCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    marginTop: 10,
    paddingTop: 20,
    borderRadius: 35,
    overflow: "hidden",
    paddingHorizontal: 20
  }
});
