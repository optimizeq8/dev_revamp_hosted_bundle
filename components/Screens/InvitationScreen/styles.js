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
  title: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    paddingTop: 0,
    textAlign: "center",
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
    marginTop: heightPercentageToDP(10),
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

  registered: {
    position: "absolute",
    bottom: 60,
    alignSelf: "center"
  },
  registeredText: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    color: "#fff"
  },

  bottomView: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    borderRadius: 13,
    width: 200,
    height: 40,
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    position: "relative",
    alignSelf: "center"
    // marginBottom: "40%"
  },
  background: {
    position: "absolute",
    opacity: 0.45,
    alignSelf: "center"
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
    top: "55%"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
