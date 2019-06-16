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
    width: "100%",
    marginTop: 20
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
    alignSelf: "center",
    paddingBottom: 20
  },
  slidercontainer: { marginHorizontal: 40 },
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
  searchRegionText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14
  },
  regionTextContainer: {
    paddingVertical: 20,
    flexDirection: "row"
  },
  locationIcon: { alignSelf: "center" }
});

export default styles;
