import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: RFValue(15, 414),
    flex: 1,
    justifyContent: "space-between",
  },
  countrySelectorText: {
    paddingVertical: RFValue(10, 414),
    color: "#FFFF",
    fontSize: RFValue(8, 414),
    textAlign: "center",
    fontFamily: "montserrat-regular",
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    // width: 1RFValue(25, 414),
    paddingTop: RFValue(10, 414),
    alignSelf: "center",
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    paddingVertical: RFValue(10, 414),
    paddingHorizontal: RFValue(10, 414),
  },
  slidercontainer: {
    paddingHorizontal: RFValue(20, 414),
    width: "100%",
    flex: 1,
  },
  toggleSelectorButton: {
    width: RFValue(25, 414),
    height: RFValue(25, 414),
  },
  selectVersionIcon: {
    fontSize: RFValue(30, 414),
    color: "#fff",
  },
  scrollContainer: {
    marginVertical: RFValue(5, 414),
    flexGrow: 1,
  },
  indicator: {
    fontSize: RFValue(15, 414),
    color: globalColors.orange,
    // marginRight: 20,
    // color: "#fff"
  },
  itemCircles: {
    fontSize: RFValue(15, 414),
    color: globalColors.orange,
  },
  choiceContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: RFValue(5, 414),
    marginBottom: RFValue(20, 414),
  },
  stickyFooterButton: {
    backgroundColor: "transparent",
    alignSelf: "center",
    borderRadius: RFValue(25, 414),
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: 5,
    marginBottom: 30,
    elevation: -1,
  },
  headerComponent: {
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    // marginBottom: hp(5),
    top: hp(0),
    paddingHorizontal: wp(4),
    paddingTop: hp(1),
  },
  icon: {
    fontSize: RFValue(35, 414),
    color: "#fff",
    paddingLeft: RFValue(2.5, 414),
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: RFValue(8.5 / PixelRatio.getFontScale(), 414),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10,
  },
  countryScrollContainer: {
    height: 180,
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: RFValue(14 / PixelRatio.getFontScale(), 414),
  },
  selectTextContainer: {
    paddingVertical: RFValue(10, 414),
    flexDirection: "row",
  },
  errorText: {
    color: "#FFFF",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    textAlign: "center",
    paddingVertical: RFValue(10, 414),
  },
  languageRowConatiner: {
    paddingVertical: RFValue(5, 414),
    marginVertical: RFValue(5, 414),
    flexDirection: "row",
    alignItems: "center",
  },

  optionsIconSize: {
    fontSize: RFValue(12.5, 414),
  },
  optionsTextContainer: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: RFValue(7, 414),
    paddingLeft: 20,
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    color: "#fff",
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    color: globalColors.orange,
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20,
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center"
  },
  customSearchField: {
    borderRadius: 15,
    borderColor: "#0000",
    backgroundColor: "#0002",
    width: wp(80),
    height: RFValue(25, 414),
    alignSelf: "center",
  },
  customSearchInput: {
    fontFamily: "montserrat-light",
    fontSize: RFValue(7 / PixelRatio.getFontScale(), 414),
    alignSelf: "center",
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: globalColors.rum,
  },
});
export default styles;
