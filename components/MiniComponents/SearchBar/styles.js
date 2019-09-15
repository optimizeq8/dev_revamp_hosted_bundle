import { StyleSheet, PixelRatio } from "react-native";

const styles = StyleSheet.create({
  searchBarView: {
    width: "100%",
    alignItems: "center"
  },
  searchBarItem: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    paddingHorizontal: 15
  },
  searchBarInput: {
    fontFamily: "montserrat-light",
    fontSize: 15 / PixelRatio.getFontScale()
  }
});

export default styles;
