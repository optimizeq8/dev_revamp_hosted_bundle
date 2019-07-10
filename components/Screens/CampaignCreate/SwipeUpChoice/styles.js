import { StyleSheet, Platform, PixelRatio } from "react-native";
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
    height: "100%"
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
    padding: 10,
    width: "100%"
  },
  deepLinkHeader: {
    flexDirection: "column",
    width: "100%",
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
  url: {
    alignSelf: "center",
    fontFamily: "montserrat-light",
    fontSize: 13,
    color: "#fff"
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
    height: "100%"
  },
  warningText: {
    color: "#fff",
    textAlign: "center",
    top: 10,
    fontFamily: "montserrat-semibold",
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
    paddingBottom: 16,
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
    fontFamily: "montserrat-semibold",
    fontSize: 14,
    alignSelf: "center"
  },
  downArrowIcon: {
    color: "#fff",
    fontSize: 20,
    left: 25
  },
  deepLinkError: {
    color: "white",
    fontFamily: "montserrat-semibold",
    fontSize: 12,
    alignSelf: "center"
  },

  input: {
    backgroundColor: "#5D1CD8",
    paddingHorizontal: 50,
    borderRadius: 10,
    borderColor: "#5D1CD8",
    alignSelf: "center",
    width: widthPercentageToDP(75),
    height: 40
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    color: "#fff"
  },
  callActionLabel: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    flex: 1
  },
  websiteContent: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center"
  },
  whatsApp: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center"
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
    height: 50
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
  }
});

export default styles;
