import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    alignSelf: "center",
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
  },
  googleMainIcon: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    // elevation: 2
  },
  safeAreaView: {
    flex: 1,
  },
  createANewText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    textAlign: "left",
    textTransform: "uppercase",
    paddingBottom: RFValue(6, 414),
  },
  mediaIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: RFValue(27.5, 414),
    height: RFValue(27.5, 414),
    borderRadius: RFValue(25, 414),
    marginHorizontal: RFValue(2.5, 414),
    backgroundColor: "rgba(0,0,0,0.16)",
  },
  activeMediaIcon: {
    borderColor: "#FF790A",
    borderWidth: 3,
  },
  headingText: {
    fontSize: RFValue(11.5, 414),
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    paddingVertical: RFValue(6.5, 414),
    textAlign: "left",
  },
  campaignText: {
    textAlign: "left",
    color: "#FFF",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
  },
  lowerButton: {
    width: RFValue(18.5, 414),
    height: RFValue(18.5, 414),
    alignSelf: "flex-end",
    left: "-22%",
  },
  suitablePoints: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(5, 414),
    lineHeight: RFValue(6.5, 414),
    color: "#FF7A09",
    textAlign: "left",
    paddingHorizontal: RFValue(2, 414),
    width: RFValue(60, 414),
  },
  suitablePointsView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  suitableForText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(6, 414),
    lineHeight: RFValue(8, 414),
    marginTop: RFValue(6, 414),
    marginBottom: RFValue(2, 414),
    color: "#575757",
    textTransform: "uppercase",
    textAlign: "left",
  },
  description: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(5, 414),
    color: "#909090",
    lineHeight: RFValue(8.5, 414),
    textAlign: "left",
    width: widthPercentageToDP(50),
  },
  titleText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(9.5, 414),
    color: "#575757",
    textTransform: "uppercase",
    lineHeight: RFValue(10.5, 414),
    paddingTop: RFValue(3.5, 414),
    textAlign: "left",
  },
  descriptionView: {
    paddingLeft: RFValue(5, 414),
    marginVertical: RFValue(10, 414),
  },
  adTypeImage: {
    alignSelf: "flex-start",
    // marginLeft: 10,
    // paddingHorizontal: 20,
    marginVertical: RFValue(10, 414),
  },
  cardView: {
    flexDirection: "row",
    paddingHorizontal: RFValue(7.5, 414),
    backgroundColor: "#FFF",
    borderRadius: RFValue(17.5),
    marginVertical: RFValue(2.5, 414),
  },
  scrollViewContent: {
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  selectADTypeText: {
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    color: "#909090",
    paddingTop: RFValue(10, 414),
    paddingHorizontal: RFValue(14, 414),
    textAlign: "left",
  },
  fbUnderProcessText: {
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: RFValue(8, 414),
    color: "#575757",
    paddingTop: RFValue(10, 414),
    paddingHorizontal: RFValue(14, 414),
    textAlign: "left",
  },
  mainView: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderTopRightRadius: RFValue(17.5, 414),
    borderTopLeftRadius: RFValue(17.5, 414),
    zIndex: 10,
    elevation: 10,
  },
  mainIcon: {
    position: "absolute",
    zIndex: -2,
    elevation: 0.15,
  },
  loginBtn: {
    height: RFValue(25, 414),
    marginTop: RFValue(10, 414),
    marginHorizontal: RFValue(10, 414),
  },
});

export default styles;
