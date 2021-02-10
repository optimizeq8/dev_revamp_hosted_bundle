import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { globalColors } from "../../../../../GlobalStyles";
import { RFValue } from "react-native-responsive-fontsize";
const styles = StyleSheet.create({
  previewBlock: {
    flexDirection: "column",
    width: wp(90),
    alignItems: "center",
    marginTop: RFValue(5, 414),
    paddingTop: RFValue(6.5, 414),
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
  },
  headerContent: {
    paddingRight: 0,
  },
  headline: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    color: "#fff",
    textAlign: "center",
    alignSelf: "flex-start",
    paddingBottom: RFValue(1, 414),
    textTransform: "uppercase",
  },
  headlineText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    color: "#1B10AB",
    alignSelf: "center",
    textAlign: "center",
    alignSelf: "flex-start",
    paddingBottom: RFValue(2.5, 414),
    paddingHorizontal: RFValue(10, 414),
  },
  headlineBlueLine: {
    borderLeftColor: "#1B10AB",
    borderLeftWidth: 1,
    marginBottom: RFValue(2.5, 414),
    marginLeft: RFValue(6.5, 414),
  },
  adIcon: {
    marginRight: RFValue(2.5, 414),
    alignSelf: "center",
    marginBottom: RFValue(2.5, 414),
    marginLeft: RFValue(10, 414),
  },
  linkText: {
    fontFamily: "montserrat-regular",
    color: "#197132",
    paddingLeft: 0,
  },
  descriptionGrayLine: {
    borderTopColor: "#EDEDED",
    borderTopWidth: 1,
    marginBottom: RFValue(2.5, 414),
    width: "100%",
  },
  descriptionText: {
    color: "#1B10AB",
    textAlign: "left",
  },
  input: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6 / PixelRatio.getFontScale(), 414),
    color: globalColors.rum,
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "flex-start",
    paddingBottom: RFValue(2.5, 414),
    paddingHorizontal: RFValue(2.5, 414),
    width: "100%",
    height: "auto",
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: RFValue(5, 414),
    paddingVertical: RFValue(5, 414),
  },
  column: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    paddingLeft: RFValue(5, 414),
    // height: 35
    // width: "100%"
  },
  textArea: {
    textAlign: I18nManager.isRTL ? "right" : "left",

    paddingRight: RFValue(10, 414),
    height: "auto",
    width: "100%",
  },
  smallFont: { fontSize: RFValue(4, 414) },
  titlePadding: {
    paddingLeft: RFValue(10, 414),
    textTransform: "uppercase",
  },
  networkLabel: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(4.5, 414),
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase",
  },
});

export default styles;
