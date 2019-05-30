import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
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
  image: {
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
