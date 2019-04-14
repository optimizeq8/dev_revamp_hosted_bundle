import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
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
  brand_name: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 30,
    fontFamily: "montserrat-medium",
    fontSize: 14,
    paddingLeft: 20,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1
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
    top: hp("35"),
    left: wp("38")
  },
  swipeUp: {
    ...StyleSheet.absoluteFillObject,
    height: 50,
    top: hp("65"),
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
    // paddingTop: 0,
    // bottom: 20,
    height: hp("73")
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
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "94%",
    height: "100%",
    zIndex: 0,
    // top: 17,
    backgroundColor: "black",
    justifyContent: "center"
  },

  mainCard: {
    top: 25,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 0,
    marginRight: 0
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
    alignSelf: "center",
    width: 55,
    height: 55,

    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: 35,
    marginHorizontal: wp(10)
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
