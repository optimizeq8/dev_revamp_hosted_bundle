import { StyleSheet } from "react-native";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaView: {
    height: "100%",
    flex: 1
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    height: "100%",
    flex: 1,
    width: "100%",
    display: "flex",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    overflow: "hidden",
    justifyContent: "space-between",
    backgroundColor: "black"
  },
  image: {
    alignSelf: "center",
    height: 120,
    width: 120,
    margin: 15
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50
  },
  mainCard: {
    top: 15,
    borderColor: "#000",
    backgroundColor: "#000",
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: 0,
    marginRight: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttontext: {
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  button: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#5F5F5F",
    alignSelf: "center"
  },
  snapbutton: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 20,
    paddingHorizontal: 10
  },
  header: {
    fontSize: 20,
    color: "#fff",
    textAlign: "center"
  },
  headline: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-semibold",
    fontSize: 14,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  bottomCard: {
    // top: 15,
    backgroundColor: "#FF9D00",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    // height: 127,
    marginLeft: 0,
    marginRight: 0,
    width: "100%"
    // paddingBottom: 34
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },

  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
