import { StyleSheet, PixelRatio, Platform } from "react-native";
const IsIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#F4F2F5",
  },
  container: {
    backgroundColor: "#F4F2F5",
    flex: 1,
  },
  contentContainer: {
    marginTop: 5,
    flex: 1,
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    backgroundColor: "#FCFBFC",
    paddingTop: 17,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: "relative",
    marginTop: 10,
    paddingBottom: 17,
  },
  textInput: {
    textAlign: "left",
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
    width: "100%",
  },
  cameraIcon: {},
  submitButton: {
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    paddingHorizontal: 20,
  },
  connectingAgentText: {
    color: "#A496AC",
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
  activityIndicator: {
    height: 72,
    width: 62,
    marginBottom: 10,
  },
  cameraButton: {
    // padding: 5,
    paddingHorizontal: 20,
  },
});

export default styles;
