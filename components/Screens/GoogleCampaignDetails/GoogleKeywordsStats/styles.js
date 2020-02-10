import { StyleSheet, PixelRatio } from "react-native";
import globalStyles from "../../../../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

export default StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%"
  },
  container: {
    backgroundColor: "#000",
    display: "flex",
    flex: 2.5,
    overflow: "hidden"
  },
  slidercontainer: {
    paddingHorizontal: 23,
    width: "100%"
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14 / PixelRatio.getFontScale(),
    borderBottomColor: "#0000",
    alignSelf: "center",
    textAlign: "center",
    height: 37
  },
  title: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14
  },
  titleHeading: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    lineHeight: 29
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  scrollContainer: {
    // marginVertical: 10,
    // flexGrow: 1,
    width: "100%",
    paddingBottom: "15%"
    // maxHeight: hp("45%")

    // flex: 1
  },
  filledButton: {
    ...globalStyles.orangeBackgroundColor,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 5,
    width: "100%",
    height: 50,
    borderRadius: 27
  },
  emptyButton: {
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 5,
    width: "100%",
    height: 50,
    borderRadius: 27
  },
  contentStyle: {
    ...globalStyles.whiteTextColor,
    ...globalStyles.buttonText,
    fontSize: 16,
    textAlign: "left"
    // lineHeight: 14
  },
  number: {
    textAlign: "left",
    color: "orange",
    fontFamily: "montserrat-regular",
    fontSize: 19
  },
  numbercontentStyle: {
    ...globalStyles.whiteTextColor,
    ...globalStyles.buttonText,
    fontSize: 12,
    flexShrink: 1
  },
  outerBlock: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "50%",
    justifyContent: "flex-start",
    marginVertical: 8
  },
  innerBlock: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingLeft: 15
  },
  subText: {
    color: "#FFF",
    fontFamily: "montserrat-regular",
    fontSize: 12
  },
  performanceView: { flexDirection: "row", marginBottom: 10 },
  bottomView: { flex: 1, padding: 24 },
  displayStatsView: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: "rgba(255,255,255,0.15)",
    flexDirection: "row",
    justifyContent: "center"
  },
  keywordRowView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignContent: "flex-end"
  },
  keywordRowOuterView: {
    flexDirection: "row",
    //   justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: 10,
    zIndex: 100,
    opacity: 1
  },
  statsOuterBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between"
  }
});
