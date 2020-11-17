import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0000",
    marginLeft: 0,
    paddingTop: 10,
  },
  dataContainer: {
    paddingTop: 30,
  },
  icon: {
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    color: globalColors.rum,
    paddingTop: 20,
    alignSelf: "center",
    fontSize: 16,
    fontFamily: "montserrat-bold",
  },
  subtitle: {
    textAlign: "center",
    color: globalColors.rum,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    width: 250,
    paddingTop: 20,
    alignSelf: "center",
  },
  multiSliderContainer: {
    marginTop: 20,
    alignSelf: "center",
  },
  selected: {
    backgroundColor: globalColors.orange,
  },
  track: {
    height: 3,
    backgroundColor: globalColors.rum,
  },
  button: {
    alignSelf: "center",
    justifyContent: "center",
    marginBottom: 40,
  },
  rangeMakerContainer: {
    flexDirection: "column",
    alignItems: "center",
    width: 50,
  },
  breaker: {
    width: 5,
    height: 20,
    backgroundColor: globalColors.rum,
    borderRadius: 14,
  },
  markerStyle: { paddingHorizontal: 0, color: globalColors.rum },
});

export default styles;
