import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  previewBlock: {
    flexDirection: "column",
    width: wp(90),
    alignItems: "center",
    marginTop: 10,
    paddingTop: 13,
    paddingBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 0.2,
    alignSelf: "center"
  },
  headersCol: {
    alignSelf: "flex-start"
  },
  headerContent: {
    paddingRight: 0
  },
  headline: {
    fontFamily: "montserrat-bold",
    fontSize: 10 / PixelRatio.getFontScale(),
    color: "#fff",
    textAlign: "center",
    alignSelf: "flex-start",
    paddingBottom: 2,
    paddingLeft: 6
  },
  headlineText: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#1B10AB",
    alignSelf: "center",
    textAlign: "center",
    alignSelf: "flex-start",
    paddingBottom: 5,
    paddingHorizontal: 20
  },
  headlineBlueLine: {
    borderLeftColor: "#1B10AB",
    borderLeftWidth: 1,
    marginBottom: 5,
    marginLeft: 13
  },
  adIcon: {
    marginRight: 5,
    alignSelf: "center",
    marginBottom: 5,
    marginLeft: 20
  },
  linkText: {
    fontFamily: "montserrat-regular",
    color: "#197132",
    paddingLeft: 0
  },
  descriptionGrayLine: {
    borderTopColor: "#EDEDED",
    borderTopWidth: 1,
    marginBottom: 5,
    width: "100%"
  },
  descriptionText: {
    color: "#1B10AB",
    textAlign: "left"
  },
  input: {
    fontFamily: "montserrat-regular",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#1B10AB",
    textAlign: I18nManager.isRTL ? "right" : "left",
    alignSelf: "flex-start",
    paddingBottom: 5,
    paddingHorizontal: 5,
    width: "100%",
    height: "auto"
  },
  row: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  column: {
    flexDirection: "column",
    flex: 1,
    justifyContent: "flex-start",
    alignContent: "flex-start",
    alignItems: "flex-start",
    height: 35
    // width: "100%"
  },
  textArea: {
    textAlign: I18nManager.isRTL ? "right" : "left",
    marginHorizontal: 10,
    paddingRight: 20,
    height: "auto",
    width: "100%"
  },
  smallFont: { fontSize: 8 },
  titlePadding: {
    paddingLeft: 20
  },
  networkLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 9,
    textAlign: "center",
    color: "#fff",
    textTransform: "uppercase"
  }
});

export default styles;
