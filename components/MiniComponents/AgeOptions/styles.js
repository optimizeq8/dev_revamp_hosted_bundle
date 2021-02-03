import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    // justifyContent: "space-between",
    backgroundColor: "#0000",
    marginLeft: 0,
    // paddingTop: 10,
  },
  dataContainer: {
    paddingTop: RFValue(15, 414),
  },
  icon: {
    alignSelf: "center",
  },
  title: {
    textAlign: "center",
    color: globalColors.rum,
    paddingTop: RFValue(10, 414),
    alignSelf: "center",
    fontSize: RFValue(8, 414),
    fontFamily: "montserrat-bold",
  },
  subtitle: {
    textAlign: "center",
    color: globalColors.rum,
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    width: RFValue(125, 414),
    paddingTop: RFValue(10, 414),
    alignSelf: "center",
  },
  multiSliderContainer: {
    marginTop: RFValue(10, 414),
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
    marginBottom: RFValue(20, 414),
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
