import { StyleSheet, PixelRatio } from "react-native";
import globalStyles from "../../../../GlobalStyles";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export default StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%",
  },
  container: {
    backgroundColor: "#000",
    display: "flex",
    flex: 2.5,
    overflow: "hidden",
  },
  slidercontainer: {
    paddingHorizontal: RFValue(12.5, 414),
    width: "100%",
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: RFValue(7 / PixelRatio.getFontScale(), 414),
    borderBottomColor: "#0000",
    alignSelf: "center",
    textAlign: "center",
    // height: RFValue(15.5, 414),
  },
  title: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    textTransform: "uppercase",
  },
  titleHeading: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    lineHeight: 29,
    textTransform: "uppercase",
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    paddingVertical: RFValue(10, 414),
    paddingHorizontal: RFValue(10, 414),
  },
  scrollContainer: {
    // marginVertical: 10,
    // flexGrow: 1,
    width: "100%",
    paddingBottom: "15%",
    // maxHeight: hp("45%")

    // flex: 1
  },
  filledButton: {
    ...globalStyles.orangeBackgroundColor,
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: RFValue(2.5, 414),
    width: "100%",
    height: RFValue(25, 414),
    borderRadius: RFValue(13.5, 414),
  },
  emptyButton: {
    backgroundColor: "rgba(0,0,0,0.15)",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: RFValue(2.5, 414),
    width: "100%",
    height: RFValue(25, 414),
    borderRadius: RFValue(13.5, 414),
  },
  contentStyle: {
    ...globalStyles.whiteTextColor,
    ...globalStyles.buttonText,
    fontSize: RFValue(8, 414),
    textAlign: "left",
    textTransform: "uppercase",
    // lineHeight: 14
  },
  number: {
    textAlign: "left",
    color: "orange",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(9.5, 414),
  },
  numbercontentStyle: {
    ...globalStyles.whiteTextColor,
    ...globalStyles.buttonText,
    fontSize: RFValue(6, 414),
    flexShrink: 1,
    textTransform: "uppercase",
  },
  outerBlock: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    width: "50%",
    justifyContent: "flex-start",
    marginVertical: RFValue(4, 414),
  },
  innerBlock: {
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingLeft: RFValue(7.5, 414),
  },
  subText: {
    color: "#FFF",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
  },
  performanceView: { flexDirection: "row", marginBottom: RFValue(5, 414) },
  bottomView: { flex: 1, padding: RFValue(12, 414) },
  displayStatsView: {
    flex: 1,
    borderLeftWidth: 2,
    borderLeftColor: "rgba(255,255,255,0.15)",
    flexDirection: "row",
    justifyContent: "center",
  },
  keywordRowView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    alignContent: "flex-end",
  },
  keywordRowOuterView: {
    flexDirection: "row",
    //   justifyContent: "space-between",
    alignItems: "center",
    alignContent: "center",
    paddingHorizontal: RFValue(5, 414),
    zIndex: 100,
    opacity: 1,
  },
  statsOuterBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
