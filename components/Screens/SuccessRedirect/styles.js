import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: "#0000",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: RFValue(10, 414),
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },

  media: {
    alignSelf: "center",
    height: heightPercentageToDP(20),
    width: "100%",
    margin: RFValue(5, 414),
    justifyContent: "flex-start",
  },
  errortext: {
    marginTop: RFValue(2.5, 414),
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-regular",
    textAlign: "center",
    lineHeight: RFValue(9, 414),
  },
  text: {
    marginTop: RFValue(1.5, 414),
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-medium",
    paddingHorizontal: RFValue(12.5, 414),
  },
  details: {
    paddingVertical: RFValue(5, 414),
    borderRadius: RFValue(10, 414),
    backgroundColor: "rgba(0,0,0,0.3)",
    width: RFValue(175, 414),
  },
  button: {
    marginTop: RFValue(12.5, 414),
    borderRadius: RFValue(12.5, 414),
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    alignSelf: "center",
    justifyContent: "center",
  },

  buttontext: {
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
  },

  title: {
    marginTop: RFValue(7.5, 414),
    color: "#fff",
    fontSize: RFValue(20.5, 414),
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
  },
  codeSentText: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    color: "#909090",
    textAlign: "center",
  },
  mobileDetailCard: {
    backgroundColor: globalColors.white,
    width: RFValue(175, 414),
    paddingVertical: RFValue(10, 414),
    borderRadius: RFValue(17.5, 414),
  },
  verifyButton: {
    width: widthPercentageToDP(40),
    height: RFValue(20, 414),
    alignSelf: "center",
  },
  bottomText: {
    textAlign: "center",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-regular",
    textDecorationLine: "underline",
    color: globalColors.orange,
    paddingTop: RFValue(10, 414),
  },
  headingText: {
    color: globalColors.white,
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    paddingHorizontal: RFValue(12.5, 414),
  },
  detail: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    color: globalColors.orange,
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    color: globalColors.rum,
    fontSize: RFValue(8, 414),
    fontFamily: "montserrat-bold",
    alignSelf: "center",
    marginBottom: RFValue(10, 414),
    textTransform: "uppercase",
  },
});

export default styles;
