import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
export default styles = StyleSheet.create({
  title: {
    fontFamily: "montserrat-bold",
    fontSize: RFValue(10, 414),
    textTransform: "uppercase",
    color: "#fff",
    textAlign: "left",
    left: "10%",
  },
  groupIconStyle: { alignSelf: "center" },
  teamMember: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#0002",
    borderRadius: RFValue(15, 414),
    paddingVertical: RFValue(5, 414),
    width: "85%",

    marginVertical: RFValue(5, 414),
  },
  teamText: {
    // right: 30,
    textTransform: "uppercase",
    textAlign: "left",
    fontFamily: "montserrat-bold",
    color: globalColors.white,
    fontSize: RFValue(6.5 / PixelRatio.getFontScale(), 414),
  },
  teamEmail: {
    fontFamily: "montserrat-light",
    color: globalColors.white,
  },
  teamMemberIconStyle: { left: 5 },
  addMember: {
    backgroundColor: globalColors.orange,
    position: "absolute",
    height: "12%",
    width: "100%",
    borderTopLeftRadius: RFValue(15, 414),
    borderTopRightRadius: RFValue(15, 414),
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    flexDirection: "row",
  },
  addTeamMember: {
    color: globalColors.white,
    fontFamily: "montserrat-bold",
    marginHorizontal: RFValue(5, 414),
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: heightPercentageToDP(3),
  },
  resendStyle: {
    fontSize: RFValue(6, 414),
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    color: globalColors.orange,
  },
});
