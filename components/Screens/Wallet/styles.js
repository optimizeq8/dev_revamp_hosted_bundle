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
  container: {
    backgroundColor: "#0000"
  },
  title: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    flex: 1,
    marginTop: heightPercentageToDP(2),
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 }
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    zIndex: 4,
    shadowColor: "#6C6C6C",
    shadowRadius: 0,
    shadowOpacity: 0,
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
    fontSize: 14
  },
  contentContainer: {
    flex: 1,
    justifyContent: "space-around",
    paddingTop: 45
  },
  closeIcon: {
    top: heightPercentageToDP(2.3),
    left: widthPercentageToDP(4),
    zIndex: 10,
    elevation: 5
  },
  text: {
    textAlign: "center",
    alignSelf: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 5,
    marginBottom: 10
  },
  mainText: {
    textAlign: "center",
    alignSelf: "center",
    color: "#5F5F5F",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    marginTop: 30
  },
  dollar: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 25
  },

  inputtext: {
    fontFamily: "montserrat-semibold",
    fontSize: 31,
    color: "#FF9D00",
    alignSelf: "center"
  },
  labeltext: {
    flex: 0,
    fontFamily: "montserrat-light",
    fontSize: 14,
    textAlign: "right",
    color: "#fff",
    top: 5
  },
  input: {
    bottom: 25,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 45,
    color: "#fff",
    borderColor: "#7039FF",
    position: "absolute"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  BlurView: {
    height: "100%",
    padding: 30,
    paddingTop: 40,
    alignItems: "center"
  },
  subHeading: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    fontFamily: "montserrat-light",
    marginVertical: 20
  }
});

export default styles;
