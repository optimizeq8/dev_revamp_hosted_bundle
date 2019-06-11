import { StyleSheet, PixelRatio } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  title: { color: "#000", fontSize: 48 },
  container: {
    // marginTop: 30,
    backgroundColor: "#751AFF"
  },
  logotext: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium"
    // bottom: "24%"
  },
  image: {
    alignSelf: "center",
    height: 100,
    width: 100,
    margin: 10
  },
  mainView: {
    // flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 30,
    // paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttontext: {
    color: "#7039FF",
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
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
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 14
  },
  bottomView: {
    top: 15,
    height: 100
  },
  error: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    marginTop: 25
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
