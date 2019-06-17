import { StyleSheet, PixelRatio } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#0000"
  },
  walletIcon: {
    alignSelf: "center",
    marginTop: 15
  },
  walletAmountText: {
    fontSize: 40
  },
  sendButton: {
    position: "relative",
    left: "20%"
  },
  midContainer: { flex: 2, justifyContent: "center" },
  container: {
    backgroundColor: "#0000"
  },
  inputAnimatableView: {
    paddingVertical: 30
  },
  keyboardContainer: { height: "100%" },
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    flex: 1,
    marginTop: heightPercentageToDP(2),
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 }
  },
  button: {
    zIndex: 4,
    shadowColor: "#6C6C6C",
    shadowRadius: 0,
    shadowOpacity: 0,
    backgroundColor: globalColors.orange,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50,
    marginTop: 20
  },
  buttontext: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 45
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10
  },
  mainText: {
    textAlign: "center",
    alignSelf: "center",
    color: "#5F5F5F",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 30
  },
  dollar: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 25
  },

  inputtext: {
    fontFamily: "montserrat-semibold",
    fontSize: 31 / PixelRatio.getFontScale(),
    color: "#FF9D00",
    alignSelf: "center"
  },
  labeltext: {
    flex: 0,
    fontFamily: "montserrat-light",
    fontSize: 14,
    textAlign: "right",
    color: "#fff",
    top: 5
  },
  input: {
    bottom: 25,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 45,
    color: "#fff",
    borderColor: "#7039FF",
    position: "absolute"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  BlurView: {
    height: "100%",
    padding: 30,
    paddingTop: 40,
    alignItems: "center"
  },
  subHeading: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-light",
    marginVertical: 20
  }
});

export default styles;
