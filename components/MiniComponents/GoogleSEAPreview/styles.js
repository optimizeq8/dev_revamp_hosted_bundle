import { StyleSheet, PixelRatio } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";

const styles = StyleSheet.create({
  previewBlock: {
    display: "flex",
    flexDirection: "column",
    width: wp(90),
    alignItems: "center",
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
    flexDirection: "column",
    paddingRight: 0
  },
  headline: {
    fontFamily: "montserrat-bold",
    fontSize: 10 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    alignSelf: "flex-start",
    paddingBottom: 2,
    paddingHorizontal: 20
  },
  headlineText: {
    fontFamily: "montserrat-regular",
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
  }
});

export default styles;
