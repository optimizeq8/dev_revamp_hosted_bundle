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
    fontFamily: "montserrat-medium",
    fontSize: 16,
    textAlign: "center",
    alignSelf: "center"
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
    textAlign: "center",
    color: globalColors.white
  },
  pickerText: {
    fontFamily: "montserrat-regular-english",
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 12
  },
  input: {
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 150,
    borderColor: "rgba(0,0,0,0)",
    alignSelf: "center",
    width: widthPercentageToDP(85),
    borderWidth: 0,
    height: 54
  },
  bottomCard: {
    justifyContent: "center",
    backgroundColor: "#FF9D00",
    shadowColor: "#6C6C6C",
    shadowRadius: 5,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: heightPercentageToDP(10)
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
    marginBottom: 20
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
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: -10,
    marginTop: I18nManager.isRTL ? -5 : 0
  },
  itemView: {
    paddingHorizontal: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  }
});

export default styles;
