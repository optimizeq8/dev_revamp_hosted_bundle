import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  container: {
    flex: 1,
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
    flex: 1
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "benton-sans-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  title: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingTop: 0,
    textAlign: "center",
    fontFamily: "montserrat-semibold"
  },
  slidtitle: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold"
  },
  slideicon: {
    fontSize: 60,
    color: "#fff",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  slidetext: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    zIndex: 10
  },
  buttonN: {
    paddingTop: 0,
    bottom: 15,
    height: 530
  },
  placeholder: {
    opacity: 0.26,
    borderRadius: 34,
    overflow: "hidden",
    alignSelf: "center",
    width: "78%",
    height: "76%",
    zIndex: 0,
    marginTop: 17,
    backgroundColor: "black",
    justifyContent: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
