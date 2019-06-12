import { StyleSheet, PixelRatio } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
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
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  maincontainer: {
    marginTop: 30,
    backgroundColor: "#0000",
    flex: 1
  },
  mainCard: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderRadius: 30,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 0,
    backgroundColor: "#fff",
    borderColor: "#0000",
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    shadowColor: "#0000",
    shadowRadius: 0,
    shadowOpacity: 0,
    shadowOffset: { width: 0, height: 0 },
    paddingTop: 15
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    backgroundColor: "#fff",
    height: 70,
    justifyContent: "center",
    flexDirection: "column"
  },
  activebutton: {
    backgroundColor: "#FF9D00",
    height: 70,
    justifyContent: "center",
    flexDirection: "column"
  },
  inactivetext: {
    fontFamily: "montserrat-medium",
    fontSize: 12,
    color: "#7039FF",
    textAlign: "center"
  },
  activetext: {
    fontFamily: "montserrat-medium",
    fontSize: 12,
    color: "#fff",
    textAlign: "center"
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
    textAlign: "center",
    alignSelf: "center"
  },
  label: {
    textAlign: "center",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center"
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    textAlign: "center"
    // marginBottom: 130
  },
  pickertext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    textAlign: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    color: "rgb(113,113,113)"
  },
  input: {
    marginBottom: 30,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 60,
    borderColor: "#7039FF"
  },
  bottomCard: {
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: heightPercentageToDP(10)
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
