import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
    width: "100%",
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    paddingTop: 30,
  },
  title: {
    textAlign: "center",
    color: globalColors.rum,
    fontSize: 16,
    fontFamily: "montserrat-bold",
    paddingTop: 20,
    alignSelf: "center",
  },
  subTitle: {
    textAlign: "center",
    color: globalColors.rum,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    // width: 150,
    paddingTop: 20,
    alignSelf: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  button: {
    alignSelf: "center",
    width: 55,
    height: 55,

    marginBottom: 40,
  },
  icon: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.rum,
    // paddingLeft: 10
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.orange,
  },
  optionsContainer: {
    flexDirection: "column",
    paddingTop: 20,
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  optionsIconSize: {
    fontSize: 25,
  },
  optionsTextContainer: {
    textAlign: "center",
    paddingLeft: 10,
  },
});

export default styles;
