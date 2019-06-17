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
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#0000"
  },
  icon: {
    alignSelf: "center"
  },
  title: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 20,
    alignSelf: "center",
    fontSize: 20,
    fontFamily: "montserrat-semibold"
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
    backgroundColor: "transparent",
    alignSelf: "center",
    borderRadius: 50,
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    top: heightPercentageToDP(5) < 30 ? -5 : 30,
    marginBottom: 25,
    elevation: -1
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
