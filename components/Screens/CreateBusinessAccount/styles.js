import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000"
  },
  topContainer: {
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 50,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30,
    height: heightPercentageToDP("11%"),
    width: "90%"
  },
  subTitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    textAlign: "center",
    fontFamily: "montserrat-regular",
    paddingHorizontal: 40,
    paddingVertical: 10
  },
  mainContainer: {
    // marginTop: 30,
    marginTop: 0,
    backgroundColor: "#0000",
    flex: 1
    // marginHorizontal: 30
  },
  mainCard: {
    flex: 1,
    marginLeft: 0,
    marginRight: 0
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  button: {
    marginHorizontal: 0,
    elevation: 0,
    paddingVertical: 10,
    borderRadius: 50,
    borderStartWidth: 0,
    borderWidth: 0,
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",
    width: "34%",
    borderColor: "transparent"
  },
  activeButton: {
    marginHorizontal: 0,
    borderColor: "transparent",
    width: "34%",
    borderRadius: 50,
    height: "100%",
    justifyContent: "center",
    flexDirection: "column",

    borderColor: "transparent"
  },
  inactiveText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "rgba(255,255,255,0.6)",
    textAlign: "center",
    paddingTop: 5
  },
  activeText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#FFF",
    textAlign: "center",
    paddingTop: 5
  },
  container: {
    justifyContent: "center",
    // paddingTop: 10,
    flex: 1
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 40
  },
  buttonText: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    textAlign: "center",
    alignSelf: "center"
  },
  appText: {
    fontSize: 12,
    color: globalColors.white,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    textAlign: "center"
  },
  optionalText: {
    fontSize: 12,
    color: globalColors.white,
    fontFamily: "montserrat-bold",
    textTransform: "capitalize"
  },
  label: {
    textAlign: "center",
    flexDirection: "row",
    display: "flex",
    justifyContent: "center"
  },
  inputText: {
    fontFamily: "montserrat-light",
    fontSize: 14 / PixelRatio.getFontScale(),
    textAlign: "left",
    color: globalColors.white
  },
  pickerText: {
    fontFamily: "montserrat-regular-english",
    color: "#FFFFFF",
    textAlign: "left",
    fontSize: 12
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.16)",
    borderRadius: 150,
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: "100%",
    borderWidth: 0,
    height: 56,
    paddingHorizontal: 0,
    display: "flex"
    // alignItems: "flex-start"
  },
  colView: {
    display: "flex",
    flexDirection: "column",
    alignSelf: "flex-start",
    marginLeft: 13,
    flex: 1
  },
  bottomCard: {
    justifyContent: "center",
    alignSelf: "center",
    height: 50,
    width: widthPercentageToDP(50),
    marginBottom: 30
  },
  link: {
    textAlign: "center",
    color: "#FFF",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 12 / PixelRatio.getFontScale(),
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  tNcLink: {
    textDecorationLine: "underline"
    // color: "blue"
  },
  buttonLink: {
    lineHeight: 20
  },
  textAgreement: {
    // bottom: 10,
    paddingHorizontal: 70,
    marginBottom: 10,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  agreementLink: {
    zIndex: 10
  },
  iconStartUp: {
    fontSize: 14 / PixelRatio.getFontScale()
  },
  iconBrandName: {
    fontSize: 18 / PixelRatio.getFontScale(),
    alignSelf: "flex-end"
  },
  iconEmail: {
    fontSize: 20 / PixelRatio.getFontScale()
  },
  iconDown: {
    color: "#FFF",
    fontSize: 20,
    right: 15
  },
  labelEmail: {
    bottom: 5,
    flexDirection: "row"
  },
  whatAreYouText: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: "montserrat-bold",
    color: "#FFF",
    textAlign: "center",
    marginVertical: 10
  },
  marginVertical: {
    marginVertical: 10
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
    zIndex: 1
  },
  inputLabel: {
    marginTop: 10,
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#FFF",
    textAlign: "left",
    textTransform: "uppercase"
  },
  itemView: {
    paddingHorizontal: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  subHeading: {
    fontSize: 19,
    color: "#FFF",
    fontFamily: "montserrat-bold",
    marginLeft: 16,
    textTransform: "uppercase"
  },
  subHeadView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 26,
    marginVertical: 15
  }
});

export default styles;
