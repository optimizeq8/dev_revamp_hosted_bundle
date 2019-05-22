import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  optionsIconSize: {
    fontSize: 25
  },
  optionsTextContainer: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: 14,
    paddingLeft: 20
  },
  safeAreaContainer: {
    height: "100%",
    width: "100%"
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  dataContainer: {
    //   marginTop: 10,
    //   alignItems: "center",
    display: "flex",
    width: "100%"
  },
  regionListContainer: {
    height: 250
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  textCon: {
    width: 320,
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center"
  },

  colorGrey: {
    color: "#fff"
  },
  colorYellow: {
    color: "#FF9D00",
    fontSize: 27,
    fontFamily: "montserrat-medium"
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  slidercontainer: { marginHorizontal: 40 },
  input: {
    marginBottom: 15,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
  },

  indicator: {
    fontSize: 30,
    marginRight: 20,
    color: "#fff"
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#fff"
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.orange
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingVertical: 10
  }
});

export default styles;
