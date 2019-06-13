import { StyleSheet, PixelRatio, Platform } from "react-native";
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
  safeAreaViewContainer: { flex: 1, backgroundColor: "#0000" },
  personalInfoIcon: {
    alignSelf: "center",
    marginTop: 20
  },
  dataContainer: {
    paddingHorizontal: 35,
    textAlign: "left"
  },
  nameText: {
    color: "#5F5F5F",
    fontFamily: "montserrat-medium",
    fontSize: 23,
    textAlign: "left",
    paddingBottom: 60
  },
  itemMobileNo: {
    marginBottom: 30
  },
  labelMobileNo: {
    bottom: 5
  },
  labelEmail: {
    bottom: 5,
    fontSize: Platform.OS === "android" ? 14 / PixelRatio.getFontScale() : 14
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    backgroundColor: "#fff",
    borderColor: "transparent",
    flex: 1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: heightPercentageToDP(5),
    marginBottom: 0,
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    paddingTop: 15
  },
  button: {
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  contentContainer: {
    paddingVertical: 20,
    justifyContent: "space-around"
  },
  label: {
    color: "#FF9D00",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    textAlign: "left"
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 21 / PixelRatio.getFontScale(),
    color: "#4B4B4B"
  },
  input: {
    bottom: 25,
    marginBottom: 20,

    width: 250,
    height: 45,
    borderColor: "#7039FF"
  }
});

export default styles;
