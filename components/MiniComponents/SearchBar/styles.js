import { StyleSheet, PixelRatio } from "react-native";

const styles = StyleSheet.create({
  searchBarView: {
    height: "70%",
    width: "70%"
    // marginVertical: 5
  },
  searchBarItem: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    paddingHorizontal: 15,
    height: "100%"
  },
  searchBarInput: {
    fontFamily: "montserrat-light",

    fontSize: 15 / PixelRatio.getFontScale()
  }
});

export default styles;
