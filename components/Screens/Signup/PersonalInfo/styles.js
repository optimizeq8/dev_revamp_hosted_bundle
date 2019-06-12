import { StyleSheet, PixelRatio } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  scrollViewStyleContainer: {
    flex: 1,
    marginVertical: 10
  },
  labelInputText: {
    bottom: 5,
    flexDirection: "column"
  },
  iconSize: {
    fontSize: 20
  },
  emailerrorText: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    bottom: 40
  },
  passwordErrorText: {
    bottom: 40,
    paddingVertical: 0,
    paddingTop: 0,
    marginBottom: 0,
    paddingVertical: 0
  },
  repassworderrorText: {
    bottom: 15,
    paddingTop: 0,
    marginBottom: 0,
    paddingVertical: 0
  },
  container: {
    paddingTop: 20
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  contentContainer: {
    paddingVertical: 40,
    flex: 1,
    justifyContent: "space-around"
  },
  icon: {
    fontSize: 45,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 40
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    bottom: 25,
    marginBottom: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 45,
    borderColor: "#7039FF"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
