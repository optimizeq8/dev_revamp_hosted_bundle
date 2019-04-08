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
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  image: {
    alignSelf: "center",
    height: 120,
    width: 120,
    margin: 10
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50
  },
  mainCard: {
    top: 15,
    borderColor: "#751AFF",
    backgroundColor: "#751AFF",
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 13
  },
  buttontext: {
    fontFamily: "benton-sans-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "benton-sans-light",
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
  businessTitle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "benton-sans-regular",
    fontSize: 20,
    paddingHorizontal: 10
  },
  bottomCard: {
    top: 15,
    backgroundColor: "#fff",
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
  },
  menuModal: {
    ...StyleSheet.absoluteFillObject,
    top: -heightPercentageToDP("50%"),
    zIndex: 10,
    elevation: 1
  },
  backDrop: {
    ...StyleSheet.absoluteFillObject,
    top: -heightPercentageToDP("50%"),
    left: -widthPercentageToDP("15%")
  },
  DropIcon: {
    position: "relative",
    top: heightPercentageToDP("5"),
    left: widthPercentageToDP("46%"),
    zIndex: 100,
    elevation: 10
  },
  CloseIcon: {
    position: "absolute",
    top: heightPercentageToDP("1"),
    left: widthPercentageToDP("46%"),
    zIndex: 100
  },
  logoutIcon: {
    position: "absolute",
    top: heightPercentageToDP("6.5"),
    left: widthPercentageToDP("85%"),
    zIndex: 100
  }
});

export default styles;
