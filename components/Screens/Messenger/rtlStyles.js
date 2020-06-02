import { StyleSheet, PixelRatio, Platform } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const IsIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
  },
  container: {
    backgroundColor: "#0000",
    flex: 1,
  },
  contentContainer: {
    marginTop: 5,
    flex: 1,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#F4F4F4",
    paddingVertical: 8,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: "relative",
    marginTop: 10,
  },
  textInput: {
    textAlign: "right",
    marginTop: 5,
    paddingLeft: 15,
    paddingTop: Platform.OS === "ios" ? 15 : 0,
    paddingRight: 15,
    alignItems: "center",
    alignContent: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    display: "flex",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#909090",
    flex: 1,
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 20,
    marginBottom: 17,
    width: "100%",
  },
  cameraIcon: {
    marginBottom: 17,
  },
  submitButton: {
    position: "absolute",
    flex: 0,
    bottom: heightPercentageToDP(5) > 40 ? -2 : "5%",
    right: heightPercentageToDP(5) > 40 ? 10 : "2%",
    transform: [
      {
        rotateY: "180deg",
      },
      {
        translateX: 0,
      },
      {
        translateY: heightPercentageToDP(5) > 40 ? -2 : -5,
      },
    ],
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginBottom: 25,
    marginRight: 18,
  },
  connectingAgentText: {
    color: "white",
    fontSize: 14 / PixelRatio.getFontScale(),
    lineHeight: 18,
    fontFamily: "montserrat-regular",
    letterSpacing: 0,
    maxWidth: 150,
    textAlign: "center",
  },
  flexView: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingAnimation: {
    width: 100,
    height: 100,
  },
  chatBotView: {
    alignSelf: "center",
  },
  chatBotViewSmall: {
    alignSelf: "flex-start",
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 10,
  },
  flexEmptyView: {
    flex: 1,
  },
});

export default styles;
