import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../../Global Styles";
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
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    paddingTop: 40
  },
  text: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-light",
    fontSize: 14
  },
  inviteText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 20
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
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  emailInput: {
    top: 15,
    marginBottom: -20,
    width: 300,
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
    fontSize: 14,
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
