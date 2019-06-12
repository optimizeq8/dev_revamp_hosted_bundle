import { StyleSheet, PixelRatio } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    marginVertical: 50,
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
  icon: {
    fontSize: 45,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  container: {
    backgroundColor: "transparent",
    // flex: 1,
    alignItems: "center",
    // padding: 20,
    // paddingTop: 20,
    justifyContent: "space-around"
  },
  info: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 20
  },
  mainCard: {
    top: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontFamily: "montserrat-light",
    fontSize: 14
  },
  text: {
    textAlign: "center",
    color: "#717171",
    fontFamily: "montserrat-light",
    fontSize: 14,
    marginTop: 20
    // marginBottom: 60
  },
  input: {
    fontFamily: "montserrat-light",
    fontSize: 21 / PixelRatio.getFontScale(),
    alignSelf: "center",
    borderBottomColor: "#f0f0f0",
    borderBottomWidth: 1,
    width: 190,
    height: 30
  },
  phoneInput: {
    borderRadius: 15,
    borderColor: "transparent",
    alignSelf: "center",
    width: widthPercentageToDP(70),
    height: 50
  }
});

export default styles;
