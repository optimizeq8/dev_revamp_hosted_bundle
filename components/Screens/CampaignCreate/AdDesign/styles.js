import { StyleSheet } from "react-native";
import { hidden } from "ansi-colors";
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
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  inputtext: {
    fontFamily: "benton-sans-light",
    fontSize: 14,
    textAlign: "left",
    color: "#fff"
  },
  inputBrand: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "center",
    width: 250,
    height: 50,
    top: 30,
    left: 50
  },
  inputHeadline: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: "center",
    width: 250,
    height: 50,
    top: 80,
    left: 50
  },
  swipeUp: {
    ...StyleSheet.absoluteFillObject,
    height: 50,
    top: 450,
    alignItems: "center"
  },

  swipeUpText: { color: "white", flex: 1 },
  buttonN: {
    paddingTop: 0,
    bottom: 15,
    height: 530
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "center",
    height: 50,
    width: 50,
    margin: 15
  },
  placeholder: {
    opacity: 0.6,
    borderRadius: 34,
    overflow: "hidden",
    alignSelf: "center",
    width: "95%",
    height: "100%",
    marginTop: 0
  },

  mainCard: {
    top: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 10
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
  }
});

export default styles;
