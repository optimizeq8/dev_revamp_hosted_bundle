import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
const styles = StyleSheet.create({
  mediaView: {
    height: hp(45),
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
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  iconView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingTop: 8,
    height: hp(5),
  },
  icon: {
    marginHorizontal: 5,
  },
  archiveIcon: {
    marginLeft: "auto",
  },
  detailProfileView: {
    paddingHorizontal: 10,
  },
  likeText: {
    fontFamily: "montserrat-bold-english",
    fontSize: 14,
    color: "#262626",
  },
  likeView: {
    flexDirection: "row",
    alignItems: "center",
    // paddingTop: 15,
    paddingHorizontal: 20,
    textAlign: "left",
  },
  captionText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#2a2a2a",
    textAlign: "left",
    // paddingHorizontal: 25,
    marginTop: 10,
    // marginHorizontal: 15
  },
  captionTextExist: {
    // height: 30,
  },
  container: {
    backgroundColor: globalColors.white,
    // marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 30,
    paddingTop: 10,
    marginHorizontal: 20,
    // alignSelf: "center"
    // flex: 1
  },
  callToActionText: {
    fontSize: 13,
    fontFamily: "montserrat-bold-english",
    color: "#46B0FC",
    textTransform: "capitalize",
  },
  swipeUpView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomColor: "rgba(112,112,112,.1)",
    borderBottomWidth: 1,
  },
  dot: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    lineHeight: 14,
    marginTop: -7,
    marginBottom: 0,
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  businessNameText: {
    fontSize: 12,
    color: "#2a2a2a",
    fontFamily: "montserrat-bold",
    paddingHorizontal: 20,
    marginTop: 4,
    textAlign: "left",
  },
  sponsoredText: {
    fontFamily: "montserrat-regular",
    fontSize: 11,
    color: "#C6C6C6",
  },
  instagramBusinessName: {
    fontFamily: "montserrat-bold-english",
    fontSize: 12,
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
    borderRadius: 7,
    height: 6,
    // marginHorizontal: "-20%",
    width: 6,
  },
});
export default styles;
