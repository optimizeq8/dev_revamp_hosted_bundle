import { StyleSheet } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    height: "100%"
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0000",
    marginLeft: 0
  },
  dataContainer: {
    paddingTop: 30
  },
  icon: {
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 20,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "montserrat-bold"
  },
  subtitle: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    width: 250,
    paddingTop: 20,
    alignSelf: "center"
  },
  multiSliderContainer: {
    marginTop: 20,
    alignSelf: "center"
  },
  selected: {
    backgroundColor: globalColors.orange
  },
  unselected: {
    backgroundColor: "rgba(255,255,255,0.3)",
    height: 2
  },
  track: {
    height: 3,
    backgroundColor: "#fff"
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 40
  },
  rangeMakerContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 50
  },
  breaker: {
    width: 5,
    height: 20,
    backgroundColor: "#fff",
    borderRadius: 14
  }
});

export default styles;
