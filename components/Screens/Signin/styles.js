import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../Global Styles";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: heightPercentageToDP(10),
    flex: 1
  },
  logo: {
    alignSelf: "center",
    position: "relative"
    // top: heightPercentageToDP(1)
  },
  logotext: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium",
    bottom: "21%"
  },

  mainView: {
    // flex: 1,
    // justifyContent: "flex-start",
    alignItems: "center"
    // borderWidth: 1
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 0
  },
  buttontext: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: widthPercentageToDP(20)
  },
  input: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  button: {
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    marginBottom: 10,
    backgroundColor: globalColors.orange,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 12
  },
  bottomView: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 13,
    width: 200,
    height: 40,
    justifyContent: "center"
  },
  error: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    marginTop: 25
  },
  background: {
    position: "absolute",
    top: heightPercentageToDP(5),
    opacity: 0.45,
    alignSelf: "center",
    zIndex: 0
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
