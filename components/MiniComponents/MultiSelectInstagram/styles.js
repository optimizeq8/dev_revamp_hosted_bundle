import { StyleSheet, PixelRatio, StatusBar, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%",
    // backgroundColor: '#751AFF',
    // backgroundColor: globalColors.purple,
  },
  container: {
    // flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "75%",
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: RFValue(15, 414),
    // flex: 1,
    justifyContent: "space-between",
    height: "80%",
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
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    // width: 150,
    paddingTop: RFValue(10, 414),
    alignSelf: "center",
  },
  subHeadings: {
    textAlign: "center",
    color: globalColors.rum,
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
    height: RFValue(25, 414),
    width: RFValue(25, 414),
    justifyContent: "center",
    alignSelf: "center",
  },
  selectVersionIcon: {
    fontSize: RFValue(30, 414),
    color: globalColors.rum,
  },
  scrollContainer: {
    marginVertical: RFValue(5, 414),
    flexGrow: 1,
  },
  indicator: {
    fontSize: RFValue(15, 414),
    color: globalColors.orange,
    // marginRight: RFValue(10, 414),
    // color: globalColors.rum
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
    position: "relative",
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
    marginVertical: RFValue(2.5, 414),
    marginBottom: RFValue(15, 414),
    elevation: -1,
  },
  headerComponent: {
    // height: RFValue(35, 414),
    // marginBottom: hp(5),
    // top: hp(3),
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    paddingHorizontal: wp(5),
    marginTop: hp(1),
  },
  icon: {
    fontSize: RFValue(35, 414),
    color: globalColors.rum,
    paddingLeft: RFValue(2.5, 414),
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: RFValue(8.5 / PixelRatio.getFontScale(), 414),
    color: globalColors.rum,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: RFValue(5, 414),
  },
  countryScrollContainer: {
    height: RFValue(90, 414),
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: globalColors.rum,
    fontSize: RFValue(7 / PixelRatio.getFontScale(), 414),
  },
  selectTextContainer: {
    paddingVertical: RFValue(8, 414),
    flexDirection: "row",
    alignItems: "center",
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
    color: globalColors.rum,
    fontSize: RFValue(7, 414),
    paddingLeft: RFValue(10, 414),
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    color: globalColors.rum,
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    color: globalColors.orange,
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: RFValue(10, 414),
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center"
  },
  interestSection: {
    fontFamily: "montserrat-bold",
    color: globalColors.rum,
    marginVertical: RFValue(5, 414),
    fontSize: RFValue(8, 414),
  },
});
export default styles;
