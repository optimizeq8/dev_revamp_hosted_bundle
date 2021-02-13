import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  categories: {
    textAlign: "left",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    paddingHorizontal: RFValue(5, 414),
  },
  categoryView: {
    display: "flex",
    flexDirection: "row",
    // alignSelf: "flex-start",
    alignItems: "center",
    // justifyContent: "center",
    marginVertical: RFValue(2.5, 414),
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    // paddingRight: 30
    // paddingVertical: hp("1")
  },
  subtext: {
    textAlign: "left",
    fontFamily: "montserrat-light",
    fontSize: RFValue(5.5, 414),
    // paddingTop: 5,
    paddingHorizontal: RFValue(5, 414),
    paddingTop: RFValue(3, 414),
    lineHeight: RFValue(8.5, 414),
    color: "#fff",
  },
  title: {
    fontSize: RFValue(8, 414),
  },
  targetingContainer: {
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#0005",
    width: "100%",
    borderRadius: RFValue(20, 414),
    // justifyContent: "center",
    paddingVertical: RFValue(10, 414),
    paddingHorizontal: RFValue(10, 414),
  },
  audienceOverview: {
    height: "100%",
    width: "40%",
  },
  audienceHeadingView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 20
  },
  placeholderView: {
    margin: RFValue(2.5, 414),
  },
  proceedLowerButton: {
    width: RFValue(17.5, 414),
    height: RFValue(17.5, 414),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalColors.orange,
    borderRadius: RFValue(15, 414),
  },
  backgroundViewWrapper: {
    justifyContent: "center",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    borderRadius: RFValue(20, 414),
  },
});

export default styles;
