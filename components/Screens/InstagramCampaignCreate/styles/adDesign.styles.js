import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  transition: { height: "100%" },
  mainView: {
    marginHorizontal: 40,
    display: "flex",
    flex: 2.5,
    overflow: "hidden",
    backgroundColor: globalColors.transparent
  },
  captionTextView: { flex: 1 },
  penIcon: { alignSelf: "center" },
  lowerBtn: {
    flexDirection: "row",
    alignSelf: "flex-end"
  },
  captionMainView: {
    height: hp(60),
    borderRadius: 50,
    marginHorizontal: 40,
    backgroundColor: "rgba(0,0,0,.3)",
    padding: 35,
    marginBottom: 5
  },
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%"
  },
  container: {
    backgroundColor: "#0000",
    display: "flex",
    justifyContent: "space-between"
    // zIndex: 5
  },
  backDrop: {
    position: "absolute",
    top: hp(5) < 30 ? -hp("73%") : -hp("63%"),
    alignSelf: "center"
  },
  block1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: wp(100),
    paddingTop: 10,
    zIndex: 1
  },
  phoneicon: {
    alignSelf: "center"
    // marginTop: 20
  },
  mainContent: {
    // flex: 1,
    // justifyContent: 'flex-start',
    paddingBottom: hp(14),
    paddingTop: 20
  },
  scrollViewStyle: {
    marginTop: 15,
    zIndex: 2
  },
  input1: {
    marginBottom: 30,
    // borderRadius: 15,
    alignSelf: "center",
    width: 300,
    // height: 30,
    borderColor: "transparent",
    // backgroundColor: '#751AFF',
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: I18nManager.isRTL ? -16 : -10
  },
  inputText: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%",
    paddingVertical: 10,
    borderBottomColor: "transparent",
    height: 50
  },
  minBudget: {
    color: "#fff",
    alignSelf: "center",
    fontSize: 11,
    fontFamily: "montserrat-regular"
  },
  title: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-bold",
    paddingTop: 30
  },
  input2: {
    paddingHorizontal: 50,
    borderRadius: 30,
    alignSelf: "center",
    top: 20,
    borderColor: "transparent"
  },
  label: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    width: "100%"
  },
  downicon: {
    color: "#fff",
    fontSize: 20
  },
  popupOverlay: {
    height: "100%"
  },
  contentContainer: {
    marginTop: 15,
    paddingTop: 15,
    marginBottom: 15
  },
  dateInput: {
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 30,
    alignSelf: "center",
    width: 300,
    height: 50,
    justifyContent: "center"
    // borderWidth: 0.5,
  },
  dateLabel: {
    textAlign: "center",
    color: globalColors.orange,
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: 16
    // paddingHorizontal: 10
  },
  date: {
    fontFamily: "montserrat-bold",
    color: "#FF9D00",
    alignItems: "center",
    fontSize: 14
  },
  block1Title: {
    top: hp(5)
  },
  innerBlock1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  dateColumn: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  topContainer: {
    paddingVertical: 10,
    width: 300,
    flexDirection: "row",
    alignSelf: "center"
    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: 'black',
    // shadowOpacity: 0.2,
  },
  collectionAdLinkForm2: {
    borderTopStartRadius: 0,
    borderBottomStartRadius: 0,
    borderBottomEndRadius: 40,
    borderTopEndRadius: 40
  },
  collectionAdLinkForm1: {
    borderBottomEndRadius: 0,
    borderTopEndRadius: 0,
    borderBottomStartRadius: 40,
    borderTopStartRadius: 40
  },
  button: {
    backgroundColor: "rgba(0,0,0,0.2)",
    width: 150,
    height: 70,
    justifyContent: "center",
    flexDirection: "column"
  },
  activeButton: {
    backgroundColor: "#FF9D00",
    height: 70,
    width: 150,
    justifyContent: "center",
    flexDirection: "column"
  },
  inactiveText: {
    fontFamily: "montserrat-bold",
    fontSize: 11,
    color: "rgba(255,255,255,0.4)",
    textAlign: "center"
  },
  activeText: {
    fontFamily: "montserrat-bold",
    fontSize: 11,
    color: "#fff",
    textAlign: "center"
  },
  buttonSubText: {
    fontFamily: "montserrat-regular",
    paddingTop: 2,
    fontSize: 12
  },
  dateTextLabel: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  objectiveTextLabel: {
    marginTop: 30,
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  collectionAdView: {
    paddingTop: 10
  },
  collectionAdText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "montserrat-bold",
    textAlign: "center"
  },
  proceedButtonRTL: {
    width: 65,
    height: 65
    // padding: 20
  },
  adImageOptionView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    borderRadius: 50,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  adImageOptionButton: {
    width: "100%",
    height: 40,
    marginHorizontal: 0
  },
  outerBlock: {
    // flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 50,
    marginVertical: 12
  },
  profileBsnNameView: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
    paddingLeft: 12,
    alignItems: "center"
  },
  businessProfilePic: {
    width: 56,
    height: 56,
    borderRadius: 30
  },
  bsnNameView: {
    paddingLeft: 12
  },
  businessNameText: {
    fontFamily: "montserrat-regular",
    fontSize: 11,
    color: globalColors.white
  },
  businessName: {
    fontFamily: "montserrat-medium",
    fontSize: 16,
    color: globalColors.white
  },

  placeholder: {
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "90%",
    height: hp(35),
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },

  placeholder1: {
    opacity: 0.35,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    zIndex: 0,
    position: "absolute",
    justifyContent: "center"
  },
  captionView: {
    display: "flex",
    flexDirection: "row",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: "center",
    width: "90%",
    // height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "space-between",
    marginTop: 15
  },
  captionText: {
    fontFamily: "montserrat-regular",
    fontSize: 9,
    color: globalColors.white
  },
  caption: {
    fontFamily: "montserrat-medium",
    fontSize: 12,
    color: globalColors.white
  },
  destinationView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: globalColors.white,
    paddingHorizontal: 20,
    paddingVertical: 15,

    borderRadius: 50,
    marginTop: 15
  },
  destinationText: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: globalColors.orange,
    textTransform: "uppercase",
    marginTop: 5
  },
  captionTextBig: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    color: globalColors.white
  },
  message: {
    flex: 1,
    // alignSelf: "flex-start",
    color: globalColors.white,
    fontSize: 12,
    fontFamily: "montserrat-regular"
  },
  addMediaText: {
    fontSize: 11,
    fontFamily: "montserrat-medium",
    textAlign: "center",
    textTransform: "uppercase",
    color: globalColors.orange,
    marginVertical: 5
  }
});

export default styles;