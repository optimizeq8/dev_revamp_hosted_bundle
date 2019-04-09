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
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0
    // elevation: 10,
    // zIndex: -1
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
    top: heightPercentageToDP("8.5"),
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.5,
    // marginBottom: heightPercentageToDP(2),
    backgroundColor: "#FF9D00",
    borderRadius: 30,
    alignSelf: "center",
    zIndex: 2
  },

  businessTitle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "benton-sans-regular",
    fontSize: 20,
    paddingHorizontal: 10
  },

  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: heightPercentageToDP("110")
  },
  menuModal: {
    // ...StyleSheet.absoluteFillObject
    zIndex: 10,
    elevation: 1
  },
  backDrop: {
    position: "absolute",
    top: -heightPercentageToDP("50%"),
    alignSelf: "center"
  },
  DropIcon: {
    position: "relative",
    top: heightPercentageToDP("5"),
    left: widthPercentageToDP("46%")
  },
  CloseIcon: {
    position: "absolute",
    top: heightPercentageToDP("1"),
    left: widthPercentageToDP("46.2%"),
    zIndex: 15,
    elevation: 10
  },
  logoutIcon: {
    position: "absolute",
    top: heightPercentageToDP("6.5"),
    left: widthPercentageToDP("85%"),
    zIndex: 10
  }
});

export default styles;
