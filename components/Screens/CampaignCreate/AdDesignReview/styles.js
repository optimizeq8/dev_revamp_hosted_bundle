import { StyleSheet } from "react-native";
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
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    // paddingTop: heightPercentageToDP(1),
    backgroundColor: "black",
    height: "100%"
    // height: heightPercentageToDP(110)
  },
  image: {
    alignSelf: "center",
    height: 50,
    width: 50,
    margin: 15
  },
  placeholder: {
    borderRadius: 10,
    // alignSelf: "center",
    width: "100%",
    minHeight: 300,
    flex: 1,
    // height: "100%",
    zIndex: 0,
    backgroundColor: "black",
    justifyContent: "center"
  },

  mainCard: {
    borderRadius: 10,
    flex: 1,
    margin: 0,
    padding: 0
    //width: "110%"
    // position: "relative"
    // height: heightPercentageToDP(93)
  },
  brand_name: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingLeft: 10
  },
  headline: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 12,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingLeft: 10
  },
  call_to_action: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 20,
    // bottom: "10%",
    // paddingVertical: 17,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 20,
    flex: 1,
    width: "100%",
    paddingLeft: 50
  },
  AD: {
    // position: "absolute",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    // bottom: "2%",
    // left: "90%",
    // paddingVertical: 17,
    textShadowColor: "rgba(0, 0, 0, 1)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 30,
    textAlign: "right",
    paddingRight: 20
  },
  activeBadege: {
    backgroundColor: "#5F5F5F",
    width: 40,
    height: 40,
    borderRadius: 20
  },
  badge: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#5F5F5F",
    borderWidth: 2
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000"
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  }
});

export default styles;
