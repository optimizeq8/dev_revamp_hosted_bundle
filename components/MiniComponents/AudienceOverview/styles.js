import { StyleSheet } from "react-native";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  categories: {
    textAlign: "left",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    paddingHorizontal: 10
  },
  categoryView: {
    display: "flex",
    flexDirection: "row",
    // alignSelf: "flex-start",
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: 5
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16
    // paddingRight: 30
    // paddingVertical: hp("1")
  },
  subtext: {
    textAlign: "left",
    fontFamily: "montserrat-light",
    fontSize: 11,
    // paddingTop: 5,
    paddingHorizontal: 10,
    paddingTop: 6,
    lineHeight: 17,
    color: "#fff"
  },
  title: {
    fontSize: 16
  },
  targetingContainer: {
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#0005",
    width: "100%",
    borderRadius: 40,
    // justifyContent: "center",
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  audienceOverview: {
    alignItems: "center",
    height: "100%",
    width: "40%"
  },
  audienceHeadingView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
    // paddingHorizontal: 20
  },
  placeholderView: {
    margin: 5
  },
  proceedLowerButton: {
    width: 35,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalColors.orange,
    borderRadius: 30
  }
});

export default styles;
