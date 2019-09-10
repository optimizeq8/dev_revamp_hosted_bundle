import { StyleSheet, PixelRatio, Platform } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const IsIOS = Platform.OS === "ios";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
    // backgroundColor: '#0000',
  },
  container: {
    backgroundColor: "#0000",
    flex: 1
  },
  contentContainer: {
    marginTop: 5,
    flex: 1
  },
  textInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: 'space-around',
    // justifyContent: 'center',
    // flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: "#F4F4F4",
    paddingVertical: 8,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    position: "relative",
    marginTop: 10
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
    fontSize: 12,
    color: "#909090",
    // lineHeight: 30,
    flex: 1,
    // maxWidth:
    backgroundColor: "white",
    borderWidth: 0,
    borderRadius: 20,
    marginBottom: 17,
    width: "100%"
    // marginHorizontal: 8,
    // borderRadius: 80
  },
  cameraIcon: {
    marginBottom: 17
    // flex: 0,
  },
  submitButton: {
    position: "absolute",
    flex: 0,

    // right: widthPercentageToDP(2),
    // bottom: heightPercentageToDP(1),

    bottom: heightPercentageToDP(5) > 40 ? -2 : "5%",
    right: heightPercentageToDP(5) > 40 ? 10 : "2%",
    transform: [
      {
        translateX: 0
      },
      {
        translateY: heightPercentageToDP(5) > 40 ? -2 : -5
      }
    ],
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginBottom: 25,
    marginRight: 18
    // bottom: heightPercentageToDP(bottom)
  },
  connectingAgentText: {
    color: "white",
    fontSize: 14,
    lineHeight: 18,
    fontFamily: "montserrat-regular",
    letterSpacing: 0,
    maxWidth: 150,
    textAlign: "center"
    // paddingTop: 10,
  },
  flexView: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  loadingAnimation: {
    width: 100,
    height: 100
  },
  chatBotView: {
    alignSelf: "center"
  },
  chatBotViewSmall: {
    alignSelf: "flex-start",
    flex: 1,
    justifyContent: "flex-end",
    paddingLeft: 10
  },
  flexEmptyView: {
    flex: 1
  }
});

export default styles;
