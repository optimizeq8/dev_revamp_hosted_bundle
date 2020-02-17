import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

export default StyleSheet.create({
  background: {
    position: "absolute",
    opacity: 0.5,
    top: 230,
    alignSelf: "center"
  },
  logoText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 15,
    fontFamily: "montserrat-medium-english",
    marginBottom: "5%"
  },
  businessNameStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-medium"
    // bottom: "21%"
  },
  brandNameStyle: {
    textAlign: "center",
    color: "#fff",
    fontSize: 31,
    fontFamily: "montserrat-bold"
  },
  backDrop: {
    position: "absolute",
    top: -heightPercentageToDP("35%"),
    alignSelf: "center",
    zIndex: -1,
    elevation: 0
  },
  mainButtonView: {
    flex: 1,
    justifyContent: "center",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    backgroundColor: "#FFF"
  },
  helloNameStyle: {
    textTransform: "uppercase",
    fontSize: 28,
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    paddingTop: 20
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
    textDecorationLine: "underline"
  },
  campaignButton: {
    marginTop: 25,
    marginBottom: 15,
    backgroundColor: globalColors.orange,
    justifyContent: "center",
    alignSelf: "center",
    width: 80,
    height: 80,
    shadowColor: "rgba(0,0,0,0.6)", // IOS
    shadowOffset: { height: 2, width: 2 }, // IOS
    shadowOpacity: 2, // IOS
    shadowRadius: 100, //IOS
    elevation: 2 // Android
  },
  campaignButtonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-bold"
  },
  mainText: {
    textAlign: "center",
    alignSelf: "center",
    color: "#909090",
    fontSize: 14,
    width: "50%",
    fontFamily: "montserrat-regular"
  },
  logo: { alignSelf: "center" },
  flex: { flex: 1, justifyContent: "center" },
  bottomText: {
    textAlign: "center",
    color: "#909090",
    fontSize: 16,
    fontFamily: "montserrat-regular"
  },
  launchText: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#575757",
    fontSize: 19
  },
  flex1: {
    flex: 1
  }
});
