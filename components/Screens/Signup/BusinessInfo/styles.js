import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  title: { color: "#000", fontSize: 48 },
  container: {
    justifyContent: "center",
    borderTopStartRadius: 30,
    backgroundColor: "#fff",
    paddingTop: 70,
    borderTopEndRadius: 30,
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    flex: 1
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
  buttontext: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginBottom: 30
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    marginBottom: 30,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50,
    borderColor: "#7039FF"
  },
  button: {
    backgroundColor: "#fff",
    alignSelf: "center",
    height: 70
  },
  activebutton: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    height: 70
  },
  inactivetext: {
    fontFamily: "montserrat-medium",
    fontSize: 12,
    color: "#7039FF"
  },
  activetext: {
    fontFamily: "montserrat-medium",
    fontSize: 12,
    color: "#fff"
  },
  link: {
    textAlign: "center",
    color: "#707070",
    paddingTop: 0,
    paddingBottom: 50,
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  bottomCard: {
    backgroundColor: "#FF9D00",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: 100
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
