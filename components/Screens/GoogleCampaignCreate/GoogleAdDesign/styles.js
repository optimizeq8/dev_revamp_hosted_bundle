import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%"
  },
  container: {
    backgroundColor: "#0000",
    display: "flex",
    justifyContent: "space-between"
  },
  previewBlock: {
    display: "flex",
    flexDirection: "column",
    width: wp(90),
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    alignSelf: "center"
  },
  headlineText: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#1B10AB",
    alignSelf: "center",
    textAlign: "center",
    alignSelf: "flex-start",
    paddingBottom: 5,
    paddingHorizontal: 20
  },
  headline: {
    fontFamily: "montserrat-bold",
    fontSize: 10 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    alignSelf: "flex-start",
    paddingBottom: 2,
    paddingHorizontal: 20
  },
  headlineBlueLine: {
    borderLeftColor: "#1B10AB",
    borderLeftWidth: 1,
    marginBottom: 5,
    marginLeft: 13
  },
  adIcon: {
    marginRight: 5,
    alignSelf: "center",
    marginBottom: 5,
    marginLeft: 20
  },
  linkText: {
    fontFamily: "montserrat-regular",
    color: "#197132",
    paddingLeft: 0
  },
  descriptionGrayLine: {
    borderTopColor: "#EDEDED",
    borderTopWidth: 1,
    marginBottom: 5,
    width: "100%"
  },
  mainContent: {
    paddingBottom: hp(35),
    paddingTop: 13
  },
  inputView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 5,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  input: {
    marginBottom: 30,
    alignSelf: "center",
    width: 300,
    borderColor: "transparent",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: -10
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    paddingVertical: 10,
    borderBottomColor: "transparent",
    height: 50
  },
  inputTextarea: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    paddingVertical: 10,
    borderBottomColor: "transparent"
  },
  networkLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    textAlign: "center",
    color: "#fff",
    top: 2
  },
  keyboardContainer: {
    flex: 1,
    height: "100%"
  }
});

export default styles;
