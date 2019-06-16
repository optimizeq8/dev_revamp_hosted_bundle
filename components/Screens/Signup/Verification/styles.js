import { StyleSheet, PixelRatio } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  keyboardContainer: {
    height: "100%",
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  scrollViewContentContainer: {
    // height: "100%",
    backgroundColor: "#0000",
    alignItems: "center",
    flex: 1,
    width: "100%"
  },
  codeInputContainer: { height: "10%" },
  renderInviteCodeLink: { color: "#FFFF" },
  emailLink: {
    paddingVertical: 0
  },
  emailLabel: {
    bottom: 5
  },
  emailLinkContainer: {
    marginTop: 20,
    paddingHorizontal: 10
  },
  sendButton: {
    position: "relative",
    bottom: "2%",
    alignSelf: "flex-end"
  },

  container: {
    // backgroundColor: "#751AFF",

    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    // padding: 20,
    // paddingTop: 40,
    overflow: "hidden"
  },
  text: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-light",
    fontSize: 14,
    lineHeight: 20
  },
  inviteText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 20,
    paddingTop: 20
  },
  button: {
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: globalColors.orange,
    // paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50,
    justifyContent: "center"
  },
  link: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-light",
    fontSize: 14,

    paddingVertical: 20,
    textDecorationLine: "underline"
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontFamily: "montserrat-light",
    fontSize: 14,
    // bottom: 20
    paddingVertical: 10
  },
  emailInput: {
    top: 15,
    marginBottom: -20,
    width: 320,
    height: 45,
    borderColor: "#7039FF"
  },
  input: {
    top: 10,
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    borderColor: "transparent",
    alignSelf: "center",
    width: 250,
    height: 50
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: widthPercentageToDP(20)
  },
  buttontext: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14
  }
});

export default styles;
