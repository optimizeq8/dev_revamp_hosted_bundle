import { StyleSheet, PixelRatio, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  selectTextContainer: {
    paddingVertical: 20,
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    display: "flex"
  },
  itemCircles: {
    fontSize: 23,
    color: globalColors.white
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between"
  },
  slidercontainer: {
    paddingHorizontal: 40,
    width: "100%"
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14 / PixelRatio.getFontScale(),
    borderBottomColor: "#0000",
    alignSelf: "center",
    textAlign: "center",
    height: 37
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    paddingTop: 20,
    alignSelf: "center"
  },
  scrollContainer: {
    marginTop: 15,
    width: "100%",
    maxHeight: hp("45%")
  },
  regionText: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    textAlign: "left",
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: 10,
    width: 180,
    color: "#fff"
  },
  regionTextView: {
    flexDirection: "row",
    flex: 1
  },
  reachText: {
    fontFamily: "montserrat-bold-english",
    color: "#fff",
    fontSize: 14,
    justifyContent: "center",
    alignSelf: "center"
  },
  searchbarContainer: {
    marginBottom: 10,
    marginTop: 20,
    alignSelf: "center",
    width: 300,
    borderColor: "#0000",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 30,
    paddingHorizontal: 15
  },
  regionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
});
export default styles;
