import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
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
    // paddingTop: heightPercentageToDP(10),
    flex: 1
  },
  logotext: {
    textAlign: "center",
    color: "#fff",
    fontSize: 22,
    fontFamily: "montserrat-medium"
    // bottom: "5%"
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
    // position: "absolute",
    // bottom: "5%",
    alignSelf: "center",
    // flex: 1,
    backgroundColor: "#0000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    borderTopColor: "#0000",
    width: "100%",
    marginBottom: 15,
    elevation: 0
  },
  registeredText: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    color: "#fff",
    marginBottom: 10
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
    // position: "relative",
    alignSelf: "center"
    // top: heightPercentageToDP(0.25)
    // marginBottom: "40%"
  },
  background: {
    position: "absolute",
    top: heightPercentageToDP(5),
    opacity: 0.45,
    alignSelf: "center",
    zIndex: 0
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
    // top: "65%"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
