import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  title: {
    top: -15,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    paddingTop: 0,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    textAlign: "center",
    fontFamily: "montserrat-light",
    paddingHorizontal: 40
  },
  maincontainer: {
    marginTop: 30,
    backgroundColor: "#751AFF",
    flex: 1
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    paddingTop: 15
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
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
  container: {
    justifyContent: "center",
    paddingTop: 10,
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
  bottomCard: {
    backgroundColor: "#FF9D00",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: 70
  },
  link: {
    textAlign: "center",
    color: "#707070",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-light",
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});

export default styles;
