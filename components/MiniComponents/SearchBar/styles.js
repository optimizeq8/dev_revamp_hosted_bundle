import { StyleSheet, PixelRatio } from "react-native";

const styles = StyleSheet.create({
  searchBarView: {
    marginHorizontal: 15
  },
  searchBarItem: {
    backgroundColor: "#fff",
    borderColor: "#fff",
    paddingHorizontal: 15
  },
  searchBarInput: { fontSize: 20 / PixelRatio.getFontScale() }
});

export default styles;
