import { StyleSheet, PixelRatio, Platform } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  menuContainer: {
    backgroundColor: "#0000",
    flexGrow: 1
  },
  switchArrowIcon: {
    marginLeft: 5,
    right: 20,
    top: 1
  },
  scrollViewContainer: {
    paddingLeft: 20,
    flexGrow: 1,
    paddingBottom: heightPercentageToDP(35)

    //   bottom: heightPercentageToDP(5) < 30 ? 10 : 0
  },

  background: {
    position: "absolute",
    opacity: 0.2,
    top: 230,
    alignSelf: "center"
  },
  text: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 13,
    textAlign: "left",
    flex: 1,
    paddingLeft: 20,
    paddingRight: Platform.OS === "android" ? 20 : 0
  },
  button: {
    top: heightPercentageToDP("2"),
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    marginBottom: heightPercentageToDP(3),
    backgroundColor: "#FF9D00",
    borderRadius: 30,
    alignSelf: "center",
    zIndex: 2
  },
  buttonText: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: 12
  },
  businessTitle: {
    alignSelf: "center",
    textAlign: "center",
    top: 0,
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 20
  },
  menutext: {
    fontFamily: "montserrat-semibold",
    fontSize: 16,
    alignSelf: "center",
    color: "#fff"
  },
  businessname: {
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingTop: 5,
    alignSelf: "center",
    color: "#fff"
  },
  menuModal: {
    // ...StyleSheet.absoluteFillObject
    backgroundColor: "#0000",
    // zIndex: 1,
    // elevation: 1,
    flexGrow: 1
  },
  CloseIcon: {
    position: "absolute",
    top: heightPercentageToDP("5"),
    left: widthPercentageToDP("6%"),
    zIndex: 15,
    padding: 10
  },
  options: {
    alignItems: "center",
    // paddingBottom: heightPercentageToDP(5) < 30 ? 0 : 5,
    // marginBottom: heightPercentageToDP(5) < 30 ? -5 : 0,
    flexDirection: "row",
    paddingVertical: 5,
    height: 60
    // justifyContent: "flex-start"
    // width: 150
  },

  icons: {
    color: "#fff",
    // paddingHorizontal: 17,
    flex: 0
    // width: 55,
    // height: 55
    // paddingBottom: heightPercentageToDP(5) < 30 ? 0 : 12
  },

  version: {
    color: "#fff",
    fontFamily: "montserrat-extralight",
    fontSize: 12,
    textAlign: "left"
    // bottom: 10
  }
});

export default styles;
