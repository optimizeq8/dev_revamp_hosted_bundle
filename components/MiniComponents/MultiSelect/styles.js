import { StyleSheet, PixelRatio, StatusBar } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaContainer: {
    height: "100%"
    // backgroundColor: '#751AFF',
    // backgroundColor: globalColors.purple,
  },
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  dataContainer: {
    alignItems: "center",
    width: "100%",
    marginTop: 30,
    flex: 1,
    justifyContent: "space-between"
  },
  countrySelectorText: {
    paddingVertical: 20,
    color: "#FFFF",
    fontSize: 16,
    textAlign: "center",
    fontFamily: "montserrat-regular"
  },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    // width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  slidercontainer: {
    paddingHorizontal: 40,
    width: "100%",
    flex: 1
  },
  toggleSelectorButton: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    borderRadius: 50,
    height: 50,
    width: 50,
    justifyContent: "center",
    // paddingRight: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: -1
  },
  selectVersionIcon: {
    fontSize: 60,
    color: "#fff"
  },
  scrollContainer: {
    marginVertical: 10,
    flexGrow: 1
  },
  indicator: {
    fontSize: 30,
    color: globalColors.orange
    // marginRight: 20,
    // color: "#fff"
  },
  itemCircles: {
    fontSize: 30,
    color: globalColors.orange
  },
  choiceContainer: {
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  button: {
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
    marginTop: 10,
    marginBottom: 40
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
    elevation: -1
  },
  headerComponent: {
    // height: 70,
    // marginBottom: hp(5),
    // top: hp(3)
    paddingHorizontal: wp(5),
    marginTop: hp(1)
  },
  icon: {
    fontSize: 70,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 17 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10
  },
  countryScrollContainer: {
    height: 180
  },
  searchInputText: {
    fontFamily: "montserrat-regular",
    color: "#fff",
    fontSize: 14 / PixelRatio.getFontScale()
  },
  selectTextContainer: {
    paddingVertical: 20,
    flexDirection: "row"
  },
  errorText: {
    color: "#FFFF",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 20
  },
  languageRowConatiner: {
    paddingVertical: 10,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center"
  },

  optionsIconSize: {
    fontSize: 25
  },
  optionsTextContainer: {
    fontFamily: "montserrat-bold-english",
    color: "#fff",
    fontSize: 14,
    paddingLeft: 20
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#fff"
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.orange
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 20
  },
  optionsContainer: {
    flex: 1,
    flexDirection: "column"
    // alignItems: "center"
  }
});
export default styles;
