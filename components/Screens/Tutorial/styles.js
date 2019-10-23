import { StyleSheet } from "react-native";

import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000"
  },
  imageView: { backgroundColor: "#fff" },
  getStartedText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 20,
    textAlign: "center"
  },
  getStartedButton: {
    alignSelf: "flex-end",
    // marginRight: widthPercentageToDP("7%"),
    bottom: heightPercentageToDP("7.5%"),
    alignSelf: "center",
    zIndex: 80,
    elevation: 3,
    backgroundColor: "#FF9D00",
    width: widthPercentageToDP(60),
    height: heightPercentageToDP(7),
    borderRadius: 15,
    justifyContent: "center"
  },
  imageSlide: {
    height: heightPercentageToDP(100),

    flex: 1,
    alignContent: "center",
    alignSelf: "center"
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    // marginTop: heightPercentageToDP(5.2),
    backgroundColor: "transparent"
    // flex: 1,
    // height: "100%"
  },
  background: {
    position: "absolute",
    opacity: 0.2,
    top: 80,
    alignSelf: "center",
    zIndex: 0
  },
  media: {
    alignSelf: "center",
    height: 100,
    width: 100,
    margin: 15
  },

  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
