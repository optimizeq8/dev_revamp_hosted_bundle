import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF",
};
const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: heightPercentageToDP(35),
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    marginTop: 3,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    textAlign: "center",
  },
  details: {
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 15,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 250,
  },
  view: {
    // flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 10,
  },
  media: {
    // flex: 1,
    alignSelf: "center",
    height: heightPercentageToDP(20),
    margin: 10,
    width: "100%",
    justifyContent: "flex-start",
  },
  errorText: {
    marginTop: 15,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  button: {
    marginTop: 25,
    backgroundColor: "#FF9D00",
    borderRadius: 15,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },
  whiteButton: {
    marginTop: 15,
    borderColor: "#fff",
    borderRadius: 15,
    borderWidth: 1,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: 15,
    color: "#fff",
    fontSize: 41,
    fontFamily: "montserrat-bold",
  },
});

export default styles;
