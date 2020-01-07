import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background2: "#9300FF",
  background1: "#5600CB"
};
const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginTop: 3,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    textAlign: "center"
  },
  details: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 250
  },
  view: {
    flex: 2,
    alignItems: "center",
    justifyContent: "flex-start"
  },
  media: {
    alignSelf: "center",
    height: 120,
    width: "100%",
    margin: 10,
    justifyContent: "flex-start"
  },
  errortext: {
    marginTop: 15,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textAlign: "center"
  },
  header: {
    fontSize: 25,
    marginBottom: 25
  },
  button: {
    marginTop: 25,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center"
  },
  whitebutton: {
    marginTop: 15,
    borderColor: "#FFF",
    borderWidth: 1,
    borderRadius: 25,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center"
  },
  buttontext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-bold"
  },
  whitebuttontext: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "montserrat-bold"
  },
  title: {
    marginTop: 15,
    color: "#fff",
    fontSize: 41,
    fontFamily: "montserrat-bold"
  }
});

export default styles;
