import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  keywordsColumn: {
    flexDirection: "column",
    alignItems: "center"
  },
  keywordScrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15
  },
  editButton: {
    overflow: "hidden",
    justifyContent: "center",
    height: 26,
    backgroundColor: "#0000",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    borderColor: "#fff",
    borderWidth: 1
  },
  editButtonText: {
    marginRight: 0,
    paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: "montserrat-regular",
    alignSelf: "center",
    color: "#fff",
    textAlign: "center"
  },
  keywordButton: {
    overflow: "hidden",
    justifyContent: "center",
    height: 26,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  keywordButtonText: {
    marginRight: 0,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "montserrat-bold",
    alignSelf: "center",
    color: "#fff",
    textAlign: "center"
  },
  xIcon: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10
  }
});

export default styles;
