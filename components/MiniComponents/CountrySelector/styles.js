import { StyleSheet, PixelRatio } from "react-native";

const styles = StyleSheet.create({
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
    width: "100%",
    flex: 1
  },
  countryScrollContainer: {
    display: "flex"
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
  selectTextContainer: {
    paddingVertical: 20,
    flexDirection: "row"
  },
  searchBar: {
    marginBottom: 10,
    marginTop: 20,
    alignSelf: "center",
    width: 300,
    borderColor: "#0000",
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 30,
    paddingHorizontal: 15
  }
});
export default styles;
