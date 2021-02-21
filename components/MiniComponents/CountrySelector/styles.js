import { StyleSheet, PixelRatio } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
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
    flex: 1,
  },
  countryScrollContainer: {
    display: "flex",
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
  selectTextContainer: {
    paddingVertical: RFValue(10, 414),
    flexDirection: "row",
  },
  searchBar: {
    marginBottom: RFValue(5, 414),
    marginTop: RFValue(10, 414),
    alignSelf: "center",
    width: RFValue(150, 414),
    borderColor: "#0000",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: RFValue(15, 414),
    paddingHorizontal: RFValue(7.5, 414),
  },
});
export default styles;
