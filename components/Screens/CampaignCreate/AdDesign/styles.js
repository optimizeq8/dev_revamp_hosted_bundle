import { StyleSheet, PixelRatio } from "react-native";
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
    fontFamily: "montserrat-semibold",
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "flex-end",
    alignItems: "flex-end"
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
    marginTop: hp(25)
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
    opacity: 0.2
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
    fontFamily: "montserrat-semibold",
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
    color: "#FF9D00",
    paddingTop: 5
  },
  mediaButtonMsg: {
    // position: "absolute",
    width: 150,
    textAlign: "center",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    color: "#FF9D00",
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
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "transparent",
    top: "50%",
    left: "50%",
    flexDirection: "column",
    opacity: 1,
    transform: [
      {
        translateX: -50
      },
      {
        translateY: -50
      }
    ]
  },
  inputMiddleButton2: {
    position: "absolute",
    // backgroundColor: '#FF9D00',
    alignSelf: "center",
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: "transparent",
    top: "50%",
    left: "50%",
    flexDirection: "column",
    opacity: 1,
    transform: [
      {
        translateX: -40
      },
      {
        translateY: -50
      }
    ]
  },
  inputBrand: {
    position: "absolute",
    alignSelf: "center",
    width: 250,
    height: 50,
    top: "2%",
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
    textAlign: "left",
    color: "#fff",
    marginLeft: 8,
    elevation: 10
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
    fontFamily: "montserrat-medium",
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
    fontSize: 12,
    marginBottom: -10,
    fontFamily: "montserrat-regular"
  },
  MediaOptionsStyle: {
    width: "80%",
    height: "40%",
    flexDirection: "row",
    padding: 20,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10
  },

  MediaOptionsTitle: {
    fontFamily: "montserrat-bold",
    color: globalColors.orange,
    fontSize: 16
  },
  MediaOptionsDescription: {
    fontFamily: "montserrat-light",
    color: "#fff",
    fontSize: 13
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
    textAlign: "center"
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
    paddingHorizontal: 8
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
    backgroundColor: globalColors.orange,
    borderRadius: 50,
    width: 50,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10
  },
  addButtonText: {
    color: globalColors.orange,
    fontFamily: "montserrat-semibold"
  },
  loadingButtons: {
    backgroundColor: "#fff",
    width: "130%",
    height: "85%",
    right: 5,
    justifyContent: "center"
  }
});

export default styles;
