import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";
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
  image: {
    alignSelf: "center",
    height: 120,
    width: 120,
    margin: 10
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50
  },
  mainCard: {
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0
    // elevation: 10,
    // zIndex: -1
  },
  background: {
    position: "absolute",
    opacity: 0.2,
    top: 230,
    alignSelf: "center",
    zIndex: 0
  },
  text: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 13,
    textAlign: "center"
  },
  buttontext: {
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
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
  buttontext: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: heightPercentageToDP(5) < 40 ? 9 : 12
  },
  businessTitle: {
    alignSelf: "center",
    textAlign: "center",
    top: 0,
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: heightPercentageToDP(5) < 40 ? 20 : 31
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
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: heightPercentageToDP("110")
  },
  menuModal: {
    // ...StyleSheet.absoluteFillObject
    backgroundColor: "#0000",
    zIndex: 10,
    elevation: 1
  },
  backDrop: {
    position: "absolute",
    top: -heightPercentageToDP("50%"),
    alignSelf: "center"
  },
  DropIcon: {
    position: "relative",
    top: heightPercentageToDP("5"),
    left: widthPercentageToDP("46%")
  },
  CloseIcon: {
    position: "absolute",
    top: heightPercentageToDP("6.5"),
    left: widthPercentageToDP("7.5%"),
    zIndex: 15,
    padding: 15,
    color: "grey"
  },
  logoutIcon: {
    zIndex: 20,
    bottom: 30,
    left: widthPercentageToDP("85%")
  },
  options: {
    alignItems: "center",
    paddingBottom: heightPercentageToDP(5) < 30 ? 0 : 5,
    marginBottom: heightPercentageToDP(5) < 30 ? -5 : 0,
    flexDirection: "row",
    justifyContent: "flex-start",
    width: 150
  },

  icons: {
    color: "#fff",
    paddingHorizontal: 17,
    paddingBottom: heightPercentageToDP(5) < 40 ? 0 : 12
  },
  privacy: {
    justifyContent: "flex-start",
    color: globalColors.orange,
    fontFamily: "montserrat-light",
    textDecorationLine: "underline"
  },
  version: {
    color: "#fff",
    fontFamily: "montserrat-extralight",
    fontSize: 12,
    bottom: 10
  }
});

export default styles;
