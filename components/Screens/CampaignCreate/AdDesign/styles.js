import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
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
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%"
  },
  popupOverlay: {
    height: "100%"
  },
  uplaodPercentage: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "montserrat-bold"
  },
  uplaodText: {
    justifyContent: "center",
    fontSize: 12,
    color: "white",
    fontFamily: "montserrat-medium",
    alignSelf: "center",
    paddingTop: 10,
    textAlign: "center"
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    top: "15%"
  },
  loadingSafeArea: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  footerButtonsContainer: {
    display: "flex",
    flexDirection: "row"
  },
  errorMsg: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: hp(1.7)
  },
  video: {
    width: "100%",
    height: "100%",
    opacity: 0.5
  },
  transition: {
    height: "100%"
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: hp(3)
  },
  mainSafeArea: {
    height: "100%",
    backgroundColor: "#0000"
  },
  blankView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: 0.4,
    height: "100%",
    width: "100%"
  },
  title: {
    fontSize: 16,
    color: "#fff",
    fontFamily: "montserrat-bold",
    textAlign: "center",
    alignSelf: "center",
    position: "absolute",
    top: "70%",
    textDecorationLine: "underline"
  },
  mediaButtonMsgEdit: {
    textAlign: "center",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    // width: 150,
    color: globalColors.orange,
    paddingTop: 5
  },
  mediaButtonMsg: {
    // position: "absolute",
    width: 150,
    textAlign: "center",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    color: globalColors.orange,
    top: 23
  },
  icon: {
    color: "#fff",
    // paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 50,
    paddingTop: 12
  },
  inputMiddleButton: {
    position: "absolute",
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "transparent",
    // top: "50%",
    // left: "50%",
    flexDirection: "column",
    opacity: 1
    // transform: [
    //   {
    //     translateX: -50
    //   },
    //   {
    //     translateY: -50
    //   }
    // ]
  },
  inputMiddleButton2: {
    position: "absolute",
    // backgroundColor: '#FF9D00',
    alignSelf: "center",
    width: 100,
    height: 100,
    borderRadius: 45,
    borderColor: "transparent",
    // top: "50%",
    // left: "50%",
    flexDirection: "column",
    opacity: 1
    // transform: [
    //   {
    //     translateX: -40
    //   },
    //   {
    //     translateY: -50
    //   }
    // ]
  },
  inputBrand: {
    position: "absolute",
    alignSelf: "center",
    width: 250,
    height: 50,
    top: "4%",
    left: "8%",
    borderColor: "transparent",
    transform: [
      {
        translateX: -5
      },
      {
        translateY: -2
      }
    ]
  },
  inputHeadline: {
    alignSelf: "center",
    position: "absolute",
    width: 250,
    height: 50,
    marginVertical: 50,
    top: "3%",
    left: "8%",
    borderColor: "transparent",
    transform: [
      {
        translateX: -5
      },
      {
        translateY: -3
      }
    ]
  },
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  inputText: {
    fontFamily: "montserrat-bold",
    fontSize: 16 / PixelRatio.getFontScale(),
    textAlign: I18nManager.isRTL ? "right" : "left",
    color: "#fff",
    marginLeft: 8
  },
  swipeUp: {
    backgroundColor: globalColors.orange,
    position: "absolute",
    alignSelf: "center",
    // width: '70%',
    minHeight: hp(5),
    // height: 40,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    borderRadius: 25,
    paddingVertical: 2,
    paddingHorizontal: 20,
    zIndex: 10,
    transform: [
      {
        translateX: 0
      },
      {
        translateY: -10
      }
    ]
  },
  swipeUpView: {
    flexDirection: "column",
    justifyContent: "space-around",
    // width: '100%',
    width: wp(60)
    // marginHorizontal: 100,
  },
  swipeUpText: {
    alignSelf: "center",
    textAlign: "center",
    color: "white",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: "100%"
  },
  buttonN: {
    minHeight: 300,
    flex: 1
  },
  placeholder: {
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "94%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },
  placeholderDownloadMedia: {
    borderRadius: 20,
    // overflow: "hidden",
    // alignSelf: "center",
    width: "100%",
    // width: "94%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },
  placeholder1: {
    opacity: 0.55,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    zIndex: 0,
    justifyContent: "center"
  },
  button: {
    alignSelf: "center",
    width: wp(10),
    height: hp(7.5),
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginHorizontal: wp(10)
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  swipeUpErrorText: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-medium",
    fontSize: 12
  },
  footerTextStyle: {
    fontSize: 12,
    color: "white",
    fontFamily: "montserrat-medium",
    alignSelf: "center"
  },
  footerStyle: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    elevation: 0
  },
  subtitleHeading: {
    textAlign: "left",
    fontSize: 12,
    marginBottom: -10,
    fontFamily: "montserrat-regular"
  },
  MediaOptionsStyle: {
    flexDirection: "row",
    paddingHorizontal: 23,
    alignItems: "center",
    marginVertical: 20
  },

  MediaOptionsTitle: {
    fontFamily: "montserrat-bold",
    color: globalColors.orange,
    fontSize: 16,
    lineHeight: 20,
    textAlign: "left"
  },
  MediaOptionsDescription: {
    fontFamily: "montserrat-light",
    color: "#fff",
    fontSize: 13,
    lineHeight: 17,
    textAlign: "left"
  },
  downIcon: {
    // position: 'absolute',
    // right: 15,
    color: "#fff",
    width: 25,
    height: 25,
    fontSize: 30,
    // marginVertical: 2,
    // bottom: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center"
  },
  swipeUpSubText: {
    fontSize: 12,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  collectionView: {
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    bottom: "10%",
    flex: 1,
    position: "absolute",
    // height: hp(13),
    minHeight: 90,
    width: "100%",
    bottom: 0,
    paddingHorizontal: 8,
    paddingVertical: 10
  },
  SnapAdCard: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderColor: globalColors.orange,
    borderWidth: 2,
    borderRadius: 15,
    height: 150,
    width: 90,
    margin: 10
  },
  addButtonStyle: {
    borderRadius: 50,
    display: "flex",
    width: 50,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  addButtonText: {
    color: globalColors.orange,
    fontFamily: "montserrat-bold"
  },
  loadingButtons: {
    backgroundColor: "#fff",
    width: "130%",
    height: "85%",
    right: 5,
    justifyContent: "center"
  },
  storyAdIndexContainer: {
    position: "absolute",
    backgroundColor: globalColors.orange,
    borderRadius: 50,
    width: 45,
    height: 45,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    right: 10,
    top: 20
  },
  storyAdIndexNum: {
    fontFamily: "montserrat-bold",
    color: globalColors.white,
    fontSize: 25
  },
  uploadDifferentDeviceHeader: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "montserrat-regular"
  },
  uploadDifferentDeviceContentContainer: {
    marginTop: 15,
    paddingTop: 15,
    marginBottom: 15
  },
  uploadDifferentDeviceRowView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20
  },
  uploadDifferentDeviceIndex: {
    width: 50,
    height: 50,
    borderRadius: 50,
    //   padding: 50,
    backgroundColor: globalColors.orange,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  uploadDifferentDeviceIndexText: {
    fontFamily: "montserrat-bold",
    fontSize: 13,
    lineHeight: 17,
    color: "#fff",
    textAlign: "center",
    alignSelf: "center"
  },
  uploadDifferentDeviceColView: {
    display: "flex",
    flexDirection: "column",
    marginRight: 80,
    paddingHorizontal: 20
  },
  uploadDifferentDeviceTitleText: {
    fontFamily: "montserrat-regular",
    fontSize: 13,
    lineHeight: 17,
    color: "#fff",
    textAlign: "left",
    paddingVertical: 5

    // alignSelf: "center"
  },
  uploadMediaFromDifferentDeviceSubtitleText: {
    fontFamily: "montserrat-regular-english",
    fontSize: 13,
    lineHeight: 17,
    color: globalColors.orange,
    textAlign: "left"
    // alignSelf: "center"
  },
  downloadMediaBottomContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    justifyContent: "center",
    marginVertical: 20
  },
  marginH20: {
    marginHorizontal: 20
  },
  downloadMediaHeaderView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  downloadMediaHeaderText: {
    textAlign: "center",
    color: "#FFF",
    fontFamily: "montserrat-bold",
    fontSize: 18,
    lineHeight: 22,
    paddingTop: 10,
    paddingHorizontal: 20
  },
  downloadMediaTopView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20
  },
  scrollViewStoryDownloadMedia: {
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    // alignItems: "center",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "space-around",
    paddingHorizontal: 5
  },
  storyAdIndividual: {
    width: 100,
    height: 160,
    borderWidth: 2,
    borderColor: globalColors.orange,
    borderRadius: 20,
    backgroundColor: "black",
    marginVertical: 10
    // marginHorizontal: 5
  },
  storyAdIndexView: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 1,
    backgroundColor: globalColors.orange,
    justifyContent: "center",
    width: 30,
    height: 30,
    borderRadius: 20,
    marginTop: -12
  },
  storyAdTextNum: {
    color: "#FFF",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    textAlign: "center",
    textAlignVertical: "center"
  },
  collectionAdIndexView: {
    position: "absolute",
    alignSelf: "center",
    zIndex: 2,
    backgroundColor: globalColors.orange,
    justifyContent: "center",
    // width: 30,
    // height: 30,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 5,
    marginTop: -12
  },
  collectionAdTextNum: {
    color: "#FFF",
    fontFamily: "montserrat-bold",
    fontSize: 10,
    lineHeight: 14,
    textAlign: "center",
    textAlignVertical: "center"
  },
  collectionAdDownloadPreviewContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    bottom: 20
  },
  collectionAdDownloadPreview: {
    width: 80,
    height: 80,
    borderColor: globalColors.orange,
    borderWidth: 2,
    borderRadius: 20,
    marginHorizontal: 2
  },
  collectionScrollViewContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1
  },
  snapAdDownloadView: {
    flex: 1,
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  collectionAdMainMediaImage: {
    flex: 1,
    height: "100%",
    width: "100%",
    borderRadius: 20,
    marginHorizontal: 2
  },
  collectionAdDownloadView: {
    flex: 1,
    paddingVertical: 10,
    width: 350,
    alignItems: "center",
    justifyContent: "center"
  },
  proceedButtonRTL: {
    width: wp(13),
    height: hp(6)
  }
});

export default styles;
