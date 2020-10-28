import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    // top: 5,
    backgroundColor: "#0000",
  },
  bottomContainer: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: 10,
  },
  imageSlide: {
    height: 250,
    width: 250,
  },
  container: {
    // marginTop: 30,
    backgroundColor: "#0000",
  },
  mainCard: {
    // bottom: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    // height: heightPercentageToDP(90),
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 0,
  },
  button: {
    // top: "3%",
    // backgroundColor: "#5F5F5F",
    // paddingHorizontal: 50,
    borderRadius: 25,
    alignSelf: "center",
    width: 250,
    height: 50,
    marginHorizontal: 0,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWebView: {
    backgroundColor: "transparent",
    height: "100%",
  },
  webview: {
    backgroundColor: "transparent",
    marginTop: -50,
  },
  loadingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: 14,
    lineHeight: 18,
    color: "#FFF",
    fontFamily: "montserrat-regular",
    textAlign: "center",
    width: "60%",
    marginVertical: 20,
  },
});

export default styles;
