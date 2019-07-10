import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%"
  },
  container: {
    backgroundColor: "transparent",
    flex: 1
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: hp(3)
  },
  mainView: {
    // minHeight: 300,
    // flex: 1
  },
  placeholder: {
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: wp(60.5),
    height: hp(28),
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },
  imagePlaceholder: {
    opacity: 0.2,
    borderRadius: 30,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "100%",
    zIndex: 0,
    justifyContent: "center"
  },
  blankView: {
    backgroundColor: "rgba(0,0,0,0.5)",
    opacity: 0.4,
    height: "100%",
    width: "100%",
    flex: 1
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20
  },
  optionsRowContainer: {
    flexDirection: "row",
    alignItems: "center"
    // paddingBottom: 20
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#fff"
    // paddingLeft: 10
  },
  activetext: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#FF9D00"
  },
  optionsIconSize: {
    fontSize: 25
  },
  optionsTextContainer: {
    textAlign: "center",
    paddingLeft: 10
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center"
  },
  netLocStyle: {
    backgroundColor: "#5D1CD8",
    borderRadius: 10,
    // marginRight: 50,
    borderColor: "#5D1CD8",
    // width: "100%",
    width: wp(20),
    height: 50
  },
  networkLabel: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    textAlign: "center",
    color: "#fff",
    flex: 1,
    top: 3,
    right: 4
  },
  input: {
    backgroundColor: "#5D1CD8",
    borderRadius: 10,
    borderColor: "#5D1CD8",
    alignSelf: "center",
    width: wp(75),
    height: 50,
    paddingHorizontal: 0,
    width: "65%"
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "left",
    color: "#fff"
  },
  loadingSafeArea: {
    width: "100%",
    height: "100%",
    alignItems: "center"
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
    alignItems: "center",
    marginTop: hp(25)
  },
  plaodPercentage: {
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
  footerButtonsContainer: {
    display: "flex",
    flexDirection: "row"
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
  icon: {
    color: "#fff",
    // paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    fontSize: 50,
    paddingTop: 12
  },
  mediaButtonMsg: {
    textAlign: "center",
    paddingTop: 23,
    fontFamily: "montserrat-medium",
    fontSize: 14,
    width: 150,
    color: "#FF9D00"
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
  errorMsg: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 12,
    paddingTop: 10
  }
});

export default styles;
