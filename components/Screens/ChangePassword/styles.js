import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 30
  },
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 20,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    paddingTop: 15
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  contentContainer: {
    paddingVertical: 40,
    flex: 1,
    justifyContent: "space-between"
  },
  closeIcon: {
    top: heightPercentageToDP(2.3),
    left: widthPercentageToDP(4),
    zIndex: 10,
    elevation: 5
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
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    bottom: 25,
    marginBottom: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 45,
    borderColor: "#7039FF"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
