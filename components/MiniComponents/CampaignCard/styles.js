import { StyleSheet, Platform } from "react-native";
import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
const bigFont = RFValue(8, 414);
const styles = StyleSheet.create({
  cardStyle: {
    // marginHorizontal: 20,
    marginHorizontal: RFValue(10, 414),
    borderRadius: 30,
    marginVertical: 8,
    marginVertical: RFValue(4, 414),
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#6268FF",
    shadowOffset: { height: 6, width: 0 },
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 0,
    alignItems: "center",
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    // alignItems: "center"
    // justifyContent: "flex-start"
  },
  titleText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: bigFont,
    // left: 5,
    textAlign: "left",
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  subtext: {
    // paddingTop: 5,
    fontFamily: "montserrat-bold",
    fontSize: 10,
    color: "#fff",
    textAlign: "left",
    includeFontPadding: false,
    textAlignVertical: "center",
  },
  campaignButton: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: Platform.OS === "ios" ? 20 : 15,
  },
  chart: {
    paddingHorizontal: 5,
    top: 15,
  },
  chartText: {
    color: globalColors.orange,
    fontFamily: "montserrat-medium",
    fontSize: 12,
    marginLeft: 10,
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 17,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-bold",
  },
  containerStyle: {
    position: "absolute",
    left: "80%",
    top: "87%",
    backgroundColor: "transparent",
    borderRadius: 20,
  },
  toggleStyle: {
    width: 65,
    height: 20,
    borderRadius: 20,
    padding: 0,
  },
  icon: {
    color: "#fff",
    fontSize: 40,
  },
  reviewText: {
    fontFamily: "montserrat-bold",
    textAlign: "left",
    // fontSize: 13,
    fontSize: RFValue(6.5, 414),
    paddingHorizontal: 5,
    color: "#fff",
    textTransform: "uppercase",
  },
  campaignInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: widthPercentageToDP(40),
    left: 10,
  },
  campaignIcons: {
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  campaignNumbers: {
    top: 6,
    fontFamily: "montserrat-medium",
    right: 10,
  },
  toggleTextLeft: {
    fontSize: 11,
    position: "absolute",
    top: -7,
    left: 12,
    fontFamily: "montserrat-light",
    color: "#fff",
  },
  toggleTextRight: {
    fontSize: 9.5,
    position: "absolute",
    top: -7,
    // left: 12,
    fontFamily: "montserrat-light",
    color: "#fff",
  },
  adStatus: {
    borderRadius: 16,
    paddingTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  circleStyle: {
    width: 17,
    height: 17,
    borderRadius: 50,
  },
  chartContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconImpression: {
    bottom: 3,
  },
  circleIcon: { color: "#fff", fontSize: 16 },
  cardText: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    // fontSize: 12,
    fontSize: RFValue(6, 414),
    textAlign: "center",
    textTransform: "uppercase",
  },
  cardStatusDays: {
    flex: 0.35,
    alignItems: "center",
    alignSelf: "center",
    paddingLeft: 5,
  },
  horizontalLineView: {
    width: 3,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.05)",
  },
});

export default styles;
