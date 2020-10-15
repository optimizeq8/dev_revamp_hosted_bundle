import { StyleSheet, PixelRatio, StatusBar, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
    height: "85%",
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    // flex: 1,
    justifyContent: "space-between",
    height: "75%",
  },
  countrySelectorText: {
    paddingVertical: 20,
    color: "#FFFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "montserrat-regular",
  },
  title: {
    textAlign: "center",
    color: globalColors.rum,
    fontFamily: "montserrat-bold",
    fontSize: 16,
    // width: 150,
    paddingTop: 20,
    alignSelf: "center",
  },
  subHeadings: {
    textAlign: "center",
    color: globalColors.rum,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  slidercontainer: {
    paddingHorizontal: 40,
    width: "100%",
    flex: 1,
  },
  toggleSelectorButton: {
    height: 50,
    width: 50,
    justifyContent: "center",
    alignSelf: "center",
  },
  selectVersionIcon: {
    fontSize: 60,
    color: globalColors.rum,
  },
  scrollContainer: {
    marginVertical: 10,
    flexGrow: 1,
  },
  indicator: {
    fontSize: 30,
    color: globalColors.orange,
    // marginRight: 20,
    // color: globalColors.rum
  },
  itemCircles: {
    fontSize: 30,
    color: globalColors.orange,
  },
  choiceContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  button: {
    marginTop: 10,
    marginBottom: 40,
    position: "relative",
  },
  stickyFooterButton: {
    backgroundColor: "transparent",
    alignSelf: "center",
    borderRadius: 50,
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
    // height: 70,
    // marginBottom: hp(5),
    // top: hp(3),
    alignSelf: I18nManager.isRTL ? "flex-end" : "flex-start",
    paddingHorizontal: wp(5),
    marginTop: hp(1),
  },
  icon: {
    fontSize: 70,
    color: globalColors.rum,
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 17 / PixelRatio.getFontScale(),
    color: globalColors.rum,
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10,
  },
  countryScrollContainer: {
    height: 180,
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: globalColors.rum,
    fontSize: 14 / PixelRatio.getFontScale(),
  },
  selectTextContainer: {
    paddingVertical: 20,
    flexDirection: "row",
  },
  errorText: {
    color: "#FFFF",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 20,
  },
  languageRowConatiner: {
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  optionsIconSize: {
    fontSize: 25,
  },
  optionsTextContainer: {
    fontFamily: "montserrat-bold",
    color: globalColors.rum,
    fontSize: 14,
    paddingLeft: 20,
    textAlign: "left",
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.rum,
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
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
});
export default styles;
