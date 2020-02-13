import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  previewBlock: {
    width: wp(90),
    marginTop: 10,
    paddingTop: 10,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    alignSelf: "center"
  },
  headersCol: {
    alignSelf: "flex-start",
    flexDirection: "column"
  },
  headerContent: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap"
  },
  headline: {
    fontFamily: "montserrat-bold",
    fontSize: 10 / PixelRatio.getFontScale(),
    color: "#fff",
    paddingBottom: 2,
    paddingHorizontal: 20,
    textTransform: "uppercase"
  },
  headlineText: {
    fontFamily: "montserrat-regular",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#1B10AB",
    paddingBottom: 5,
    paddingHorizontal: 20
  },
  headlineBlueLine: {
    borderLeftColor: "#1B10AB",
    borderLeftWidth: 1,
    height: 30,
    marginBottom: 5,
    marginLeft: 13
  },
  adIcon: {
    marginRight: 5,
    alignSelf: "center",
    fontFamily: "montserrat-bold",
    fontSize: 14
  },
  linkText: {
    fontFamily: "montserrat-regular",
    color: "#0009",
    paddingLeft: 0,
    fontSize: 10,
    marginLeft: 20
  },
  descriptionGrayLine: {
    borderTopColor: "#EDEDED",
    borderTopWidth: 1,
    marginBottom: 5,
    width: "100%"
  },
  descriptionText: {
    color: "#0009",
    textAlign: "left"
  },
  headlineRow: {
    flexDirection: "row"
  },
  headlineRowContainer: {
    flexDirection: "row",
    width: "100%",
    paddingRight: 20
  }
});

export const dynamicStyle = language => {
  return StyleSheet.create({
    arabic: {
      // backgroundColor: "red",
      alignItems: language === "1019" ? "flex-end" : "flex-start",
      justifyContent: language === "1019" ? "flex-end" : "flex-start",
      alignSelf: language === "1019" ? "flex-end" : "flex-start",
      textAlign: language === "1019" ? "right" : "left"
    }
  });
};

export default styles;
