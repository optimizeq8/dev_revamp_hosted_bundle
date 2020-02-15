import { StyleSheet, PixelRatio } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  marginVertical: {
    marginBottom: 30
  },
  personalInfoView: {
    backgroundColor: "#0000",
    display: "flex",
    justifyContent: "space-between",
    flex: 1,
    paddingTop: 0
  },
  mobileView: {
    width: 300,
    alignSelf: "center",
    marginBottom: 25
  },
  inputLabel: {
    marginBottom: -10,
    fontFamily: "montserrat-bold",
    fontSize: 12,
    lineHeight: 18,
    color: "#FFF",
    textAlign: "center"
  },
  labelEmail: {
    flexDirection: "row"
  },
  labelPassword: {
    bottom: 5
  },
  labelIcon: {
    fontSize: 20 / PixelRatio.getFontScale()
  },
  repeatPassword: {
    marginBottom: 0,
    paddingBottom: 0
  },
  scrollViewStyleContainer: {
    flex: 1,
    marginVertical: 10
  },
  labelInputText: {
    // bottom: 5,
    flexDirection: "column"
  },
  iconSize: {
    position: "absolute",
    marginLeft: 15,
    fontSize: 16 / PixelRatio.getFontScale()
  },
  emailerrorText: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-regular",
    fontSize: 15,
    // bottom: 40,
    alignSelf: "center",
    justifyContent: "center"
  },
  passwordErrorText: {
    bottom: 40,
    paddingVertical: 0,
    paddingTop: 0,
    marginBottom: 0,
    paddingVertical: 0
  },
  repassworderrorText: {
    bottom: 15,
    paddingTop: 0,
    marginBottom: 0,
    paddingVertical: 0
  },
  container: {
    paddingTop: 20
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  contentContainer: {
    // paddingVertical: 40,
    flex: 1,
    justifyContent: "space-around"
  },
  icon: {
    fontSize: 45,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  text: {
    textAlign: "center",
    color: "#FFF",
    paddingTop: 5,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10
    // paddingVertical: 10,
    // marginBottom: 40
  },
  inputText: {
    fontFamily: "montserrat-light-english",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF"
  },
  // input: {
  //   // bottom: 25,
  //   marginBottom: 20,
  //   paddingHorizontal: 50,
  //   borderRadius: 15,
  //   alignSelf: "center",
  //   width: 300,
  //   height: 45,
  //   borderColor: "#7039FF"
  // },
  input: {
    backgroundColor: "rgba(0,0,0,0.2)",
    // paddingHorizontal: 10,
    borderRadius: 150,
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: 300,
    borderWidth: 0,
    height: 50
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  labelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  }
});

export default styles;
