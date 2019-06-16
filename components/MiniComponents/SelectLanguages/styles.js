import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
    width: "100%"
  },
  dataContainer: {
    //   marginTop: 10,
    //   alignItems: "center",
    display: "flex",
    width: "100%"
  },
  optionsContainer: {
    flexDirection: "column",
    paddingTop: 20,
    marginHorizontal: 40
  },
  languageListContainer: {
    height: 200
  },
  languageRowConatiner: {
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  optionsIconSize: {
    fontSize: 25
  },
  optionsTextContainer: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: 14,
    paddingLeft: 20
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    // width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around"
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14
  },
  button: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
    // justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  icon: {
    fontSize: 80,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
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
  }
});

export default styles;
