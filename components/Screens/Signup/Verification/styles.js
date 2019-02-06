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

  image: {
    alignSelf: "center",
    height: 100,
    width: 100,
    margin: 15
  },
  mainCard: {
    top: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    fontFamily: "benton-sans-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 40
  },
  buttontext: {
    fontFamily: "benton-sans-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "benton-sans-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    bottom: 30,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
  },
  button: {
    marginBottom: 10,
    backgroundColor: "#5F5F5F",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  link: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "benton-sans-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 10,
    textDecorationLine: "underline"
  },
  bottomCard: {
    top: 15,
    backgroundColor: "#6C6C6C",
    shadowColor: "#6C6C6C",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: 100
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
