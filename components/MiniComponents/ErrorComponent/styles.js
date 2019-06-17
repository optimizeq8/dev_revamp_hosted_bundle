import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
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
  image: {
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
    fontFamily: "montserrat-light",
    textAlign: "center"
  },
  header: {
    fontSize: 25,
    marginBottom: 25
  },
  button: {
    marginTop: 25,
    backgroundColor: "#FF9D00",
    borderRadius: 15,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center"
  },
  whitebutton: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 15,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center"
  },
  buttontext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular"
  },
  whitebuttontext: {
    color: "#751AFF",
    fontSize: 14,
    fontFamily: "montserrat-regular"
  },
  title: {
    marginTop: 15,
    color: "#fff",
    fontSize: 41,
    fontFamily: "montserrat-semibold"
  }
});

export default styles;
