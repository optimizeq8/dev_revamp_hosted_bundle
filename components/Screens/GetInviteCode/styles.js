import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  title: {
    position: "relative",
    marginBottom: 30,
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    top: "20%",
    alignSelf: "center",
    fontFamily: "montserrat-medium"
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 13,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  mainCard: {
    borderColor: "transparent",
    flex: 1
  },

  input: {
    top: "10%",
    position: "relative",
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    borderColor: "transparent",
    alignSelf: "center",
    width: widthPercentageToDP(70),
    height: 50
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: widthPercentageToDP(20)
  },
  button: {
    position: "relative",
    top: "10%",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: globalColors.orange,
    // paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: widthPercentageToDP(70),
    height: 50,
    justifyContent: "center"
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 14,
    position: "absolute",
    paddingVertical: 20,
    textDecorationLine: "underline",
    alignSelf: "center",
    top: 25,
    position: "relative"
  }
});

export default styles;