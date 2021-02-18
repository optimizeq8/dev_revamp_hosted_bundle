import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF",
};
const styles = StyleSheet.create({
  switchAccountText: {
    marginTop: 5,
    marginBottom: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: "montserrat-bold",
    color: "#5F5F5F",
    textTransform: "uppercase",
    fontSize: RFValue(9.5, 414),
    textAlign: "left",
    marginTop: 28,
    paddingHorizontal: RFValue(25, 414),
  },
  container: {
    backgroundColor: "#0000",
    zIndex: 10,
  },
  noInviteText: {
    alignSelf: "center",
    color: "#A496AC",
    fontFamily: "montserrat-regular",
    fontSize: RFValue(7, 414),
    textAlign: "center",
    position: "absolute",
    bottom: hp(30),
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "transparent",
    position: "relative",
  },
  text: {
    textAlign: "center",
    color: "#C6C6C6",

    fontFamily: "montserrat-regular",
    fontSize: 14,
  },
  bottomCard: {
    borderRadius: 50,
    height: RFValue(27, 414),
    width: RFValue(150, 414),
    position: "absolute",
    alignSelf: "center",
    bottom: hp(5) > 40 ? hp(10) : hp(12),
  },
  bottomCard2: {
    borderRadius: 50,
    height: 54,
    width: wp(70),
    position: "absolute",
    alignSelf: "center",
    bottom: hp(20),
    borderColor: "#D2C6D8",
    borderWidth: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  subtext: {
    fontFamily: "montserrat-regular",
    fontSize: RFValue(6, 414),
    // paddingBottom: 20,
    color: "#A496AC",
    // color: "#FF790A"
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: hp("30"),
    paddingHorizontal: RFValue(20, 414),
  },
  headings: {
    fontFamily: "montserrat-bold",
    marginVertical: 10,
    fontSize: 14,
    color: "#575757",
    textAlign: "left",
  },
  customInputStyle: {
    backgroundColor: "#FFF",
    height: "100%",
    // borderColor: "#A0A0A0",
    // borderWidth: 0.2,
    alignSelf: "center",
    marginLeft: "10%",
    marginRight: "10%",
    elevation: 5,

    // marginHorizontal: "10%"
  },
  customSearchBarStyle: {
    marginTop: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.16,
    shadowRadius: 2,
    elevation: 5,
    shadowOffset: {
      height: 3,
      width: 0,
    },
  },
  flatlistWrapper: { height: hp(55), marginTop: 10 },
  iconStyle: {
    fontSize: RFValue(7.5, 414),
    color: "#fff",
  },
  tabView: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: RFValue(20, 414),
  },
  tabText: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(7, 414),
    color: "#A0A0A0",
    textTransform: "uppercase",
  },
  touchTabView: {
    marginRight: 15,
    paddingHorizontal: 5,
    borderBottomColor: "#0000",
    paddingBottom: 3,
    borderBottomWidth: 5,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  activeTab: {
    borderBottomColor: "#FF790A",
    color: "#FF790A",
  },
  pendingInviteNumber: {
    fontFamily: "montserrat-bold-english",
    color: globalColors.white,
    fontSize: RFValue(5, 414),
    textAlign: "center",
  },
  pendingInviteView: {
    backgroundColor: globalColors.orange,
    width: 17,
    paddingVertical: 3,
    borderRadius: 30,
    alignSelf: "flex-end",
    marginRight: -10,
    marginBottom: -5,
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },
  addNewBusinessText: {
    fontSize: RFValue(8, 414),
    color: globalColors.white,
    fontFamily: "montserrat-medium",
  },
});

export default styles;
