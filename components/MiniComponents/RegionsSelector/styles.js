import { StyleSheet, PixelRatio, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  selectTextContainer: {
    paddingVertical: RFValue(10, 414),
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    display: "flex",
  },
  itemCircles: {
    fontSize: RFValue(11.5, 414),
    color: globalColors.white,
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    flex: 1,
    justifyContent: "space-between",
  },
  slidercontainer: {
    paddingHorizontal: RFValue(20, 414),
    width: "100%",
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: RFValue(7 / PixelRatio.getFontScale(), 414),
    borderBottomColor: "#0000",
    alignSelf: "center",
    textAlign: "center",
    height: RFValue(16.5, 414),
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    paddingTop: RFValue(10, 414),
    alignSelf: "center",
  },
  scrollContainer: {
    marginTop: RFValue(7.5, 414),
    width: "100%",
    maxHeight: hp("45%"),
  },
  regionText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    textAlign: "left",
    justifyContent: "center",
    alignSelf: "center",
    paddingLeft: RFValue(5, 414),
    width: RFValue(90, 414),
    color: "#fff",
  },
  regionTextView: {
    flexDirection: "row",
    flex: 1,
  },
  reachText: {
    fontFamily: "montserrat-bold-english",
    color: "#fff",
    fontSize: RFValue(7, 414),
    justifyContent: "center",
    alignSelf: "center",
  },
  searchbarContainer: {
    marginBottom: RFValue(5, 414),
    marginTop: RFValue(10, 414),
    alignSelf: "center",
    width: RFValue(150, 414),
    borderColor: "#0000",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: RFValue(15, 414),
    paddingHorizontal: RFValue(7.5, 414),
  },
  regionsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default styles;
