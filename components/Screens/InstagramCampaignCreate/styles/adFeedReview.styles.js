import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";
const styles = StyleSheet.create({
  mediaView: {
    // height: hp(45),
    width: "100%",
  },
  mediaViewExist: {
    height: hp(30),
    width: "100%",
  },
  forwadIcon: {
    transform: [{ rotate: I18nManager.isRTL ? "180deg" : "0deg" }],
  },
  mediaView2: {
    width: "100%",
    top: 0,
    bottom: 0,
    zIndex: -10,
    height: "100%",
    position: "absolute",
  },
  profilePicView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: RFValue(5, 414),
  },
  iconView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10, 414),
    // paddingTop: 8,
    height: hp(5),
  },
  icon: {
    marginHorizontal: 5,
    fontSize: RFValue(7, 414),
  },
  archiveIcon: {
    marginLeft: "auto",
  },
  detailProfileView: {
    paddingHorizontal: RFValue(5, 414),
  },
  likeText: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(7, 414),
    color: "#262626",
  },
  likeView: {
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: 15,
    paddingHorizontal: RFValue(10, 414),
    textAlign: "left",
  },
  captionText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    color: "#2a2a2a",
    textAlign: "left",
    // paddingHorizontal: RFValue(12.5, 414),
    marginTop: RFValue(5, 414),
    // marginHorizontal: 15
  },
  captionTextExist: {
    // height: RFValue(15, 414),
  },
  container: {
    backgroundColor: globalColors.white,
    // marginHorizontal: RFValue(10, 414),
    borderRadius: RFValue(12.5, 414),
    paddingBottom: RFValue(15, 414),
    paddingTop: RFValue(5, 414),
    marginHorizontal: RFValue(10, 414),
    width: "90%",
    // alignSelf: "center"
    // flex: 1
  },
  callToActionText: {
    fontSize: RFValue(6.5, 414),
    fontFamily: "montserrat-bold-english",
    color: "#46B0FC",
    textTransform: "capitalize",
  },
  swipeUpView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(10, 414),
    paddingVertical: RFValue(6, 414),
    borderBottomColor: "rgba(112,112,112,.1)",
    borderBottomWidth: 1,
  },
  dot: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    lineHeight: RFValue(7, 414),
    marginTop: RFValue(-3.5, 414),
    marginBottom: 0,
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  businessNameText: {
    fontSize: RFValue(6, 414),
    color: "#2a2a2a",
    fontFamily: "montserrat-bold",
    paddingHorizontal: RFValue(10, 414),
    marginTop: RFValue(2, 414),
    textAlign: "left",
  },
  sponsoredText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(5.5, 414),
    color: "#C6C6C6",
  },
  instagramBusinessName: {
    fontFamily: "montserrat-bold-english",
    fontSize: RFValue(6, 414),
    color: "#2a2a2a",
  },
  dotView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  imagePreview: {
    width: "100%",
    height: "100%",
  },
  imagePreviewStory: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  paginationContainerStyle: {
    // paddingVertical: 5,
    // bottom: hp(),
    // left: wp(18),
    // justifyContent: "center",
    width: wp(0),
    alignItems: "center",
    alignSelf: "center",
    marginLeft: "20%",
    marginRight: "20%",
  },
  paginationDotStyle: {
    borderRadius: RFValue(3.5, 414),
    height: RFValue(3, 414),
    // marginHorizontal: "-20%",
    width: RFValue(3, 414),
  },
  callToActionView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: RFValue(5, 414),
    position: "absolute",
    bottom: 0,
  },
  callToActionTextStory: {
    color: "#FFF",
    fontFamily: "montserrat-regular",
    lineHeight: RFValue(8.5, 414),
  },
  swipeUpViewStory: {
    flexDirection: "column",
    borderBottomWidth: 0,
    alignSelf: "center",
    flex: 1,
  },
  closeIcon: { alignSelf: "center", marginLeft: "auto" },
  safeareaView: { flex: 1 },
  transitionView: { height: "100%" },
  storyContainer: {
    paddingTop: 0,
    paddingBottom: 0,
    height: hp(85),
    width: wp(90),
    marginHorizontal: 0,
    alignSelf: "center",
  },
  progressBar: { marginHorizontal: RFValue(5, 414) },
  profileImage: { borderRadius: RFValue(10, 414) },
});
export default styles;
