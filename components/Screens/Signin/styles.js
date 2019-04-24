import { StyleSheet } from "react-native";
import { globalColors } from "../../../Global Styles";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  logo: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-regular"
  },
  image: {
    alignSelf: "center",
    height: heightPercentageToDP(17),
    width: heightPercentageToDP(17),
    margin: 10
  },
  mainView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: 24,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  buttontext: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingHorizontal: widthPercentageToDP(20)
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  button: {
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    marginBottom: 10,
    backgroundColor: globalColors.orange,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: heightPercentageToDP(1.7)
  },
  bottomView: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 13,
    width: 150,
    height: 40,
    justifyContent: "center"
  },
  error: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    marginTop: 25
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
