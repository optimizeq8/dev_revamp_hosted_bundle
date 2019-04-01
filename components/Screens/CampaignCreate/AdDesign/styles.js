import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { hidden } from "ansi-colors";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: "#fff",
    fontFamily: "montserrat-semibold",
    textAlign: "center",
    paddingTop: 40,
    paddingVertical: 10,
    paddingRight: 30
  },
  container: {
    marginTop: 10,
    backgroundColor: "#751AFF",
    flex: 1
  },

  inputtext: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
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
  inputMiddleButton: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "transparent",
    alignSelf: "center",
    top: 250,
    left: 143
  },
  swipeUp: {
    ...StyleSheet.absoluteFillObject,
    height: 50,
    top: 450,
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "center"
  },

  swipeUpText: {
    color: "white",
    fontFamily: "montserrat-medium",
    fontSize: 16
  },
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
    opacity: 0.5,
    borderRadius: 34,
    overflow: "hidden",
    alignSelf: "center",
    width: "94%",
    height: "100%",
    zIndex: 0,
    marginTop: 17,
    backgroundColor: "black",
    justifyContent: "center"
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
    fontFamily: "montserrat-medium",
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
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: 35
  },
  icon: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
