import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    flex: 1,
    display:"flex",
    alignItems: "center",
    justifyContent:"center",
    // top: heightPercentageToDP(23),
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 }
  },
  button: {
    zIndex: 4,
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0.5, height: 1 },
    backgroundColor: globalColors.orange,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50,
    marginTop: 20
  },
  buttontext: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 16
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
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
