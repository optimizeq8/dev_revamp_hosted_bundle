import { StyleSheet } from "react-native";
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
  button: {
    marginTop: 20,
    padding: 10
  },
  link: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-light",
    fontSize: 14,
    paddingTop: 40,
    paddingBottom: 10,
    paddingVertical: 10,
    textDecorationLine: "underline"
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontFamily: "montserrat-light",
    fontSize: 14,
    marginBottom: 30,
    paddingVertical: 10
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
