import { StyleSheet, Platform, PixelRatio } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  contentContainerStyle: {
    alignSelf: "center",
    width: "100%",
    // minHeight: '100%',
    flexGrow: 1,
    marginBottom: heightPercentageToDP(35)
    // justifyContent: 'space-around',
    //   height: heightPercentageToDP(80),
    //   overflow: "hidden"
  },
  keyboardContainer: {
    // alignSelf: 'center',
    // width: '100%',
    flex: 1
    // justifyContent: 'space-around',
  },
  mainView: {
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 20
  },
  imageApp: {
    height: heightPercentageToDP(8.3),
    width: heightPercentageToDP(8.3),
    alignSelf: "center",
    borderRadius: 18
  },
  appDetailsContainer: {
    flexDirection: "column",
    paddingTop: 10
  },
  advertiseOSView: {
    flexDirection: "column",
    paddingVertical: 20,
    borderRadius: 35,
    backgroundColor: "rgba(0,0,0,0.2)"
  },
  changeAppText: {
    paddingTop: 20,
    paddingBottom: 20,
    // top: heightPercentageToDP(17),
    textDecorationLine: "underline",
    fontFamily: "montserrat-bold",
    fontSize: heightPercentageToDP(2)
  },
  advertiseOSButtonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
  },
  androidButton: {
    paddingHorizontal: 0
  },
  deepLinkItem: {
    marginBottom: 0
    //   top: heightPercentageToDP(4)
  },
  listText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    // flex: 1,
    width: 170
  },
  footerText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    paddingBottom: 16,
    textDecorationLine: "underline",
    textAlign: "center"
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  container: {
    backgroundColor: "transparent",
    marginTop: 0,
    height: "100%"
    // marginTop: heightPercentageToDP(3)
  },
  textcontainer: {
    // flex: 1,
    flexDirection: "column",
    alignItems: "center"
    // paddingHorizontal: 7
    // marginBottom: 20
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-bold",
    fontSize: 16,
    paddingVertical: 0
  },
  subtext: {
    alignSelf: "center",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingTop: 5,
    // marginBottom: 10,
    color: "#fff",
    textAlign: "center"
  },
  appTexts: {
    alignSelf: "center",
    fontFamily: "montserrat-medium",
    fontSize: widthPercentageToDP(3.2),
    paddingTop: 5,
    marginBottom: 20,
    // width: widthPercentageToDP(50),
    color: "#fff",
    textAlign: "center"
  },
  icon: {
    alignSelf: "center",
    paddingHorizontal: 7
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  video: {
    // height: 95,
    // width: 95,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 30,
    // justifyContent: "space-around",
    alignItems: "center"
    // height: "100%"
  },
  placeholder: {
    borderRadius: 13,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: 150,
    zIndex: 0,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#fff",
    justifyContent: "center"
  },
  mainCard: {
    top: 15,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "#fff",
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  text: {
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    alignSelf: "center"
  },

  deepLinkError: {
    color: "white",
    // paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 12,
    alignSelf: "center"
    // width: widthPercentageToDP(75),
    // top: heightPercentageToDP(5)
  },
  activeBadege: {
    backgroundColor: "#5F5F5F",
    width: 40,
    height: 40,
    borderRadius: 20
  },
  badge: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#5F5F5F",
    borderWidth: 2
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    height: heightPercentageToDP(105)
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 50,
    borderRadius: 50,
    borderColor: "#5D1CD8",
    alignSelf: "center",
    width: "100%",
    height: 50
    // marginHorizontal: 50
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    color: "#fff"
  },
  root: {
    marginTop: 20,
    padding: 10
  },
  titleContainer: {
    shadowColor: "#00000021",
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor: "#DCDCDC",
    padding: 10
  },
  title: {
    textAlign: "center",
    color: "white",
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 16
    // paddingHorizontal: 20,
    // width: widthPercentageToDP(55)
  },
  // container: {
  //   paddingVertical: 12,
  //   flexDirection: "row",
  //   alignItems: "flex-start",
  //   flexDirection: "row",
  //   alignItems: "flex-start"
  // },
  content: {
    marginLeft: 16,
    flex: 1
  },
  contentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6
  },
  OS: {
    padding: widthPercentageToDP(4),
    marginHorizontal: widthPercentageToDP(2),
    borderRadius: 90,
    height: parseInt(heightPercentageToDP(7.2)),
    width: parseInt(widthPercentageToDP(16)),
    justifyContent: "center"
  },
  OSText: {
    fontSize: widthPercentageToDP(2.9),
    fontFamily: "montserrat-bold",
    alignSelf: "center"
  },
  toggleStyle: {
    alignSelf: "center",
    marginTop: 10,
    width: widthPercentageToDP("13"),
    height: heightPercentageToDP("2.7"),
    borderRadius: 25,
    padding: 0
  },
  toggleCircle: {
    width: widthPercentageToDP("5"),
    height: heightPercentageToDP("2.4"),
    borderRadius: 50
  },
  callToActionLabelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1,
    borderWidth: 0,
    marginTop: 20
  },
  appStoreLabelView: {
    borderTopLeftRadius: 160,
    borderTopRightRadius: 130,
    // // borderTopRightRadius: 200,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    // borderRadius: 150 0 0 20,
    paddingTop: 10,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 25,
    zIndex: 1
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    // borderRadius: 30,
    marginBottom: -10
  },
  appStoreButtons: {
    // display: 'flex',
    // flexDirection: 'column',
    alignItems: "center"
    // justifyContent: 'center',
  },
  appStoreButtonsText: {
    fontFamily: "montserrat-bold-english",
    fontSize: 10,
    color: "#fff",
    paddingTop: 5,
    maxWidth: 80,
    textAlign: "center"
  }
});

export default styles;
