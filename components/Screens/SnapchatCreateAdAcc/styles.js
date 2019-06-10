import { StyleSheet } from "react-native";
import { globalColors } from "../../../Global Styles";
import { heightPercentageToDP } from "react-native-responsive-screen";
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
    backgroundColor: newFunction()
  },
  image: {
    alignSelf: "center",
    height: heightPercentageToDP(13),
    width: heightPercentageToDP(13),
    margin: 15
  },
  mainCard: {
    // bottom: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    // height: heightPercentageToDP(90),
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 15,
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
    // top: "3%",
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
    fontFamily: "montserrat-regular",
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

export const htmlStyles = {
  h1: {
    fontSize: 30
  },
  a: {
    fontWeight: "300",
    color: globalColors.purple // make links coloured pink
  },
  ul: {
    marginBottom: -50
  },
  div: {
    marginTop: 10,
    paddingBottom: 10
  },
  p: {
    marginBottom: -50
  },
  h4: {
    marginBottom: -30,
    fontSize: 20
  },
  img: {
    width: 75,
    height: 75
  },
  h2: { marginBottom: -40, fontSize: 25 }
};
export default styles;
function newFunction() {
  return "#751AFF";
}
