import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  previewBlock: {
    width: wp(90),
    marginTop: RFValue(5, 414),
    paddingTop: RFValue(5, 414),
    paddingBottom: RFValue(7.5, 414),
    backgroundColor: "#fff",
    borderRadius: RFValue(2.5, 414),
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    alignSelf: "center",
  },
  headersCol: {
    alignSelf: "flex-start",
    flexDirection: "column",
  },
  headerContent: {
    flexDirection: "row",
    flex: 1,
    flexWrap: "wrap",
  },
  headline: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(5 / PixelRatio.getFontScale(), 414),
    color: "#fff",
    paddingBottom: RFValue(1, 414),
    paddingHorizontal: RFValue(10, 414),
    textTransform: "uppercase",
  },
  headlineText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    color: "#1B10AB",
    paddingBottom: RFValue(2.5, 414),
    paddingHorizontal: RFValue(10, 414),
  },
  headlineBlueLine: {
    borderLeftColor: "#1B10AB",
    borderLeftWidth: 1,
    height: RFValue(15, 414),
    marginBottom: RFValue(2.5, 414),
    marginLeft: RFValue(6.5, 414),
  },
  adIcon: {
    marginRight: RFValue(2.5, 414),
    alignSelf: "center",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
  },
  linkText: {
    fontFamily: "montserrat-regular",
    color: "#0009",
    fontSize: RFValue(5, 414),
    marginLeft: RFValue(10, 414),
  },
  descriptionGrayLine: {
    borderTopColor: "#EDEDED",
    borderTopWidth: 1,
    marginBottom: RFValue(2.5, 414),
    width: "100%",
  },
  descriptionText: {
    color: "#0009",
    textAlign: "left",
  },
  headlineRow: {
    flexDirection: "row",
  },
  headlineRowContainer: {
    flexDirection: "row",
    width: "100%",
  },
});

export const dynamicStyle = (language) => {
  return StyleSheet.create({
    arabic: {
      // backgroundColor: "red",
      alignItems:
        language === "1019"
          ? I18nManager.isRTL
            ? "flex-start"
            : "flex-end"
          : I18nManager.isRTL
          ? "flex-end"
          : "flex-start",
      justifyContent:
        language === "1019"
          ? I18nManager.isRTL
            ? "flex-start"
            : "flex-end"
          : I18nManager.isRTL
          ? "flex-end"
          : "flex-start",
      alignSelf:
        language === "1019"
          ? I18nManager.isRTL
            ? "flex-start"
            : "flex-end"
          : I18nManager.isRTL
          ? "flex-end"
          : "flex-start",
      textAlign:
        language === "1019"
          ? I18nManager.isRTL
            ? "left"
            : "right"
          : I18nManager.isRTL
          ? "right"
          : "left",
    },
  });
};

export default styles;
