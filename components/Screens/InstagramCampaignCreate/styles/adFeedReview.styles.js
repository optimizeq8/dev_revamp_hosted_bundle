import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
const styles = StyleSheet.create({
  mediaView: {
    height: hp(45),
    width: "100%"
  },
  profilePicView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  iconView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16
  },
  icon: {
    marginHorizontal: 5
  },
  archiveIcon: {
    marginLeft: "auto"
  },
  detailProfileView: {
    paddingHorizontal: 10
  },
  likeText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#2a2a2a"
  },
  likeView: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 15,
    paddingHorizontal: 20
  },
  captionText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#2a2a2a",
    // paddingHorizontal: 25,
    marginTop: 10
    // marginHorizontal: 15
  },
  container: {
    backgroundColor: globalColors.white,
    // marginHorizontal: 20,
    borderRadius: 20,
    paddingBottom: 30,
    paddingTop: 10,
    marginHorizontal: 20
    // alignSelf: "center"
    // flex: 1
  },
  callToActionText: {
    fontSize: 13,
    fontFamily: "montserrat-bold-english",
    color: "#46B0FC"
  },
  swipeUpView: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomColor: "rgba(112,112,112,.1)",
    borderBottomWidth: 1
  },
  dot: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    lineHeight: 14,
    marginTop: -7,
    marginBottom: 0,
    alignSelf: "flex-end",
    marginLeft: "auto"
  },
  businessNameText: {
    fontSize: 12,
    color: "#2a2a2a",
    fontFamily: "montserrat-bold",
    paddingHorizontal: 20,
    marginTop: 4
  },
  sponsoredText: {
    fontFamily: "montserrat-regular",
    fontSize: 11,
    color: "#C6C6C6"
  },
  instagramBusinessName: {
    fontFamily: "montserrat-bold-english",
    fontSize: 12,
    color: "#2a2a2a"
  },
  dotView: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto"
  },
  imagePreview: {
    width: "100%",
    height: "100%"
  }
});
export default styles;