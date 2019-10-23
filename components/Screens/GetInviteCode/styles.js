import { StyleSheet, PixelRatio } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  keyboardContainer: {
    alignItems: "center",
    // justifyContent: "center",
    flex: 1
  },
  keyboardView: {
    flex: 1,
    alignItems: "center"
    // justifyContent: "center"
  },
  title: {
    // position: "relative",
    marginBottom: 30,
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    // top: "20%",
    marginTop: 20,
    alignSelf: "center",
    fontFamily: "montserrat-medium"
  },
  container: {
    paddingTop: 20,
    backgroundColor: "transparent",
    flex: 1,
    alignItems: "center"
    // justifyContent: "flex-start"
    // paddingTop: 50
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    // top: "10%",
    marginTop: 10,
    // position: "relative",
    marginBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 30,
    borderColor: "transparent",
    alignSelf: "center",
    width: widthPercentageToDP(75),
    height: 50
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: widthPercentageToDP(20)
  },
  button: {
    // position: "relative",
    // top: "10%",
    marginTop: 0,
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    backgroundColor: globalColors.orange,
    // paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: widthPercentageToDP(70),
    height: 50,
    justifyContent: "center",
    elevation: 2
  },
  buttontext: {
    fontFamily: "montserrat-medium"
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 14,
    // position: "absolute",
    paddingVertical: 20,
    textDecorationLine: "underline",
    alignSelf: "center"
    // elevation: 2

    // top: 25,
    // position: "relative"
  }
});

export default styles;
