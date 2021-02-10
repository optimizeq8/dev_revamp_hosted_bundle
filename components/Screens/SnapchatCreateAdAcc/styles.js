import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    // top: 5,
    backgroundColor: "#0000",
  },
  bottomContainer: {
    // flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginVertical: RFValue(5, 414),
  },
  imageSlide: {
    height: RFValue(125, 414),
    width: RFValue(125, 414),
  },
  container: {
    // marginTop: RFValue(15, 414),
    backgroundColor: "#0000",
  },
  mainCard: {
    // bottom: 15,
    shadowColor: "#595959",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: RFValue(15, 414),
    borderTopEndRadius: RFValue(15, 414),
    flex: 1,
    // height: heightPercentageToDP(90),
    marginLeft: 0,
    marginRight: 0,
    marginTop: 5,
    marginBottom: 0,
  },
  button: {
    // top: "3%",
    // backgroundColor: "#5F5F5F",
    // paddingHorizontal: RFValue(25, 414),
    borderRadius: RFValue(12.5, 414),
    alignSelf: "center",
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    marginHorizontal: 0,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentWebView: {
    backgroundColor: "transparent",
    height: "100%",
  },
  webview: {
    backgroundColor: "transparent",
    marginTop: -50,
  },
  loadingView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    fontSize: RFValue(7, 414),
    lineHeight: RFValue(9, 414),
    color: "#FFF",
    fontFamily: "montserrat-regular",
    textAlign: "center",
    width: "60%",
    marginVertical: RFValue(10, 414),
  },
  questionText: {
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
    color: "#FFF",
    width: "60%",
  },
  radioView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    marginHorizontal: RFValue(5, 414),
  },
  answerText: {
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
    color: "#FFF",
    marginHorizontal: RFValue(1, 414),
  },
  questionView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: RFValue(10, 414),
  },
  answerRadio: {
    width: RFValue(15, 414),
    height: RFValue(15, 414),
    borderRadius: RFValue(15, 414),
    backgroundColor: "#0005",
    justifyContent: "center",
  },
  answerRadioSelect: {
    width: RFValue(11, 414),
    height: RFValue(11, 414),
    borderRadius: RFValue(12.5, 414),
    backgroundColor: globalColors.orange,
    alignSelf: "center",
  },
});

export default styles;
