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
    // flex: 1,
    fontSize: 16,
    color: "#fff",
    fontFamily: "montserrat-semibold",
    textAlign: "center",
    alignSelf: "center"
  },
  container: {
    backgroundColor: "transparent",
    flex: 1
  },

  inputtext: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    textAlign: "left",
    color: "#fff",
    marginLeft: 8,
    // zIndex: 30,
    elevation: 500
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
    position: "absolute",
    alignSelf: "center",
    width: 250,
    height: 50,
    top: "3%",
    left: "8%",
    transform: [
      {
        translateX: -5
      },
      {
        translateY: -3
      }
    ]
  },
  inputHeadline: {
    alignSelf: "center",
    position: "absolute",
    width: 250,
    height: 50,
    marginTop: 35,
    top: "5%",
    left: "8%",
    transform: [
      {
        translateX: -5
      },
      {
        translateY: -5
      }
    ]
  },
  inputMiddleButton: {
    position: "absolute",
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "transparent",
    top: "50%",
    left: "50%",
    transform: [
      {
        translateX: -50
      },
      {
        translateY: -50
      }
    ]
  },
  swipeUp: {
    position: "absolute",
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: "88%"
  },

  swipeUpText: {
    color: "white",
    fontFamily: "montserrat-medium",
    fontSize: 16
  },
  buttonN: {
    minHeight: 300,
    flex: 1
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
    // opacity: 0.5,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "94%",
    height: "100%",
    // minHeight: 300,
    // zIndex: 0,
    // backgroundColor: "black",
    justifyContent: "center"
  },
  placeholder1: {
    opacity: 0.5,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    zIndex: 0,
    justifyContent: "center"
  },
  mainCard: {
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
    width: wp(10),
    height: hp(7.5),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
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
  },
  swipeUpErrorText: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-medium",
    fontSize: hp(1.7)
  },
  footerTextStyle: {
    fontSize: 12,
    color: "white",
    fontFamily: "montserrat-medium",
    alignSelf: "center"
  },
  footerStyle: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0
  }
});

export default styles;
