import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";
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
    flex: 1
  },
  errortext: {
    marginTop: 5,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-light",
    textAlign: "center",
    lineHeight: 18
  },
  image: {
    alignSelf: "center",
    height: 170,
    width: 170
  },
  BlurView: {
    zIndex: 10,
    height: "100%"
  },
  mainCard: {
    top: 20,
    borderColor: "#FF9D00",
    backgroundColor: "#FF9D00",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: 45,
    width: 200,
    marginLeft: 0,
    marginRight: 0,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    justifyContent: "center"
  },
  backDrop: {
    position: "absolute",
    top: -heightPercentageToDP("30%"),
    alignSelf: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  boldtext: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    alignSelf: "center"
  },

  snapbutton: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#fff"
  },
  link: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-light",
    fontSize: 15,
    paddingHorizontal: 10,
    lineHeight: 15
  },
  walletInfo: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  header: {
    fontFamily: "montserrat-medium",
    paddingHorizontal: 50,
    paddingVertical: 20,
    textAlign: "center",
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  headerview: {
    marginTop: 10,
    flex: 1,
    alignItems: "center",
    paddingVertical: 20
  },
  bottomCard: {
    top: 15,
    borderColor: "#FF9D00",
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: 100,
    marginLeft: 0,
    marginRight: 0,
    shadowRadius: 5,
    shadowOpacity: 0.2
  },
  button: {
    borderWidth: 0.3,
    borderColor: "#fff",
    marginTop: 15,
    borderRadius: 10,
    alignSelf: "center",
    justifyContent: "center"
  },
  walletButton: {
    backgroundColor: globalColors.orange,
    marginTop: 15,
    borderRadius: 10,
    paddingHorizontal: 20,

    alignSelf: "center",
    justifyContent: "center"
  },
  buttontext: {
    color: "#fff",
    fontSize: 12,
    fontFamily: "montserrat-medium"
  },
  whitebutton: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 0,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 15,
    alignSelf: "center",
    justifyContent: "center"
  },
  whitebutton2: {
    marginTop: 15,
    backgroundColor: "#fff",
    borderRadius: 0,
    borderTopEndRadius: 15,
    borderBottomEndRadius: 15,
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 10
  },
  whitebuttontext: {
    color: "#751AFF",
    fontSize: 12,
    fontFamily: "montserrat-medium",
    textAlign: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
