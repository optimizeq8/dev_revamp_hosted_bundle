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
    backgroundColor: "#0000"
  },
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
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
    marginTop: heightPercentageToDP(5),
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
    paddingVertical: 20,
    justifyContent: "space-around"
  },
  closeIcon: {
    top: heightPercentageToDP(2.3),
    left: widthPercentageToDP(4),
    zIndex: 10,
    elevation: 5
  },
  label: {
    color: "#FF9D00",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    textAlign: "left"
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 10,
    marginBottom: 40
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 21,
    color: "#4B4B4B"
  },
  input: {
    bottom: 25,
    marginBottom: 20,

    width: 250,
    height: 45,
    borderColor: "#7039FF"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
