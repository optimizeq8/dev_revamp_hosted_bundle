import { StyleSheet } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
const styles = StyleSheet.create({
  safeAreaContainer: {
    backgroundColor: "black",
    height: "100%"
  },
  container: {
    backgroundColor: "black",
    height: "100%",
    flex: 1,
    width: "100%"
  },
  header: {
    backgroundColor: "transparent",
    borderBottomWidth: 0,
    paddingTop: 0.1,
    height: 35
  },
  headerBody: {
    alignItems: "flex-start"
  },
  brandName: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 14,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingLeft: 10
  },
  headline: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 12,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1,
    paddingLeft: 10
    // flex: 1
  },
  content: {
    flex: 1,
    margin: 0,
    padding: 0,
    height: "100%"
  },
  mainCard: {
    borderRadius: 15,
    flex: 1,
    margin: 0,
    padding: 0
  },
  video: {
    width: "100%",
    height: "100%"
  },
  placeholder: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
    zIndex: 0,
    backgroundColor: "black",
    justifyContent: "center"
  },
  callToActionContainer: {
    bottom: "12%",
    // marginBottom: -60,
    height: "5%",
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center"
  },
  callToActionText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 20,
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 20,
    flex: 1
    // width: "100%",
    // paddingLeft: 50
  },
  appInstallCallToActionText: {
    textAlign: "left",
    paddingLeft: 10,
    flex: 0,
    fontSize: 14
  },
  AD: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 14,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1.5 },
    textShadowRadius: 10,
    textAlign: "right",
    paddingRight: 20
  },
  appInstallCallToActionContainer: {
    bottom: heightPercentageToDP(17),
    justifyContent: "space-between"
  },
  iconArrowUp: {
    // flex: 2,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  getButton: {
    borderRadius: 20,
    alignSelf: "center",
    padding: 0,
    width: widthPercentageToDP(25),
    height: 35,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  getButtonText: {
    textAlign: "center",
    flex: 1,
    fontFamily: "montserrat-bold",
    fontSize: 16,
    alignSelf: "center",
    alignItems: "center"
  },
  headlineBottomText: {
    fontSize: 12,
    paddingTop: 2,
    fontFamily: "montserrat-bold",
    textAlign: "left"
  },
  brandNameBottomText: {
    color: "black",
    fontFamily: "montserrat-bold",
    //   fontSize: 16
    fontSize: heightPercentageToDP(2.4),
    textAlign: "left"
  },
  appIconBottom: {
    width: widthPercentageToDP(14),
    height: heightPercentageToDP(8),
    borderWidth: 1,
    borderRadius: 15,
    marginHorizontal: 10
    // padding: 5
  },
  textContainerBottom: {
    flex: 1
  },
  collectionPlaceholder: {
    backgroundColor: "rgba(255, 255, 255, 1)",
    alignSelf: "center",
    // width: 72,
    width: 72,
    height: 72,
    // height: hp(9.5),
    // borderRadius: 20,
    paddingVertical: 1,
    paddingHorizontal: 1,
    justifyContent: "center"
  },
  collectionImage: {
    overflow: "hidden",
    alignSelf: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 0,
    alignItems: "center"
    // justifyContent: "center"
  },
  collectionView: {
    alignContent: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    bottom: "10%",
    flex: 1,
    position: "absolute",
    height: heightPercentageToDP(13),
    // minHeight: 90,
    width: "100%",
    bottom: 0,
    paddingHorizontal: 8
  },
  bottomView: {
    width: widthPercentageToDP(94),
    height: heightPercentageToDP(12),
    borderRadius: 10,
    bottom: heightPercentageToDP(16),
    marginHorizontal: 10,
    display: "flex",
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: -2, height: 2 },
    shadowRadius: 10
  },
  closeButton: {
    left: widthPercentageToDP(0),
    top: heightPercentageToDP(0)
  },
  appInstallAndBlankCallToActionContainer: {
    flexDirection: "column",
    height: 50,
    paddingLeft: 50,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default styles;
