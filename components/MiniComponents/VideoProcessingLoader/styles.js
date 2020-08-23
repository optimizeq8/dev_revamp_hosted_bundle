import { StyleSheet } from "react-native";

export default StyleSheet.create({
  uplaodPercentageText: {
    position: "absolute",
    fontFamily: "montserrat-bold-english",
    fontSize: 14,
    lineHeight: 16,
    color: "#FFF",
    // top: heightPercentageToDP(1.75),
    right: 0,
    left: 0,
    textAlign: "center",
  },
  percentage: {
    fontSize: 8,
    color: "#FFF",
    fontFamily: "montserrat-bold-english",
  },
  animatedLoaderContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: "#0000",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  subTitle: {
    top: "60%",
    alignSelf: "center",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingTop: 5,
    color: "#fff",
    paddingHorizontal: 20,
    textAlign: "center",
    position: "absolute",
  },
});
