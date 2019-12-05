import { StyleSheet, PixelRatio } from "react-native";
import { globalColors } from "../../../GlobalStyles";
import { heightPercentageToDP } from "react-native-responsive-screen";

export default styles = StyleSheet.create({
  groupIconStyle: { alignSelf: "center" },
  teamMember: {
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#0002",
    borderRadius: 30,
    paddingVertical: 10,
    width: "85%",

    marginVertical: 10
  },
  teamText: {
    // right: 30,

    fontFamily: "montserrat-bold",
    color: globalColors.white,
    fontSize: 11 / PixelRatio.getFontScale()
  },
  teamEmail: {
    fontFamily: "montserrat-light",
    color: globalColors.white
  },
  teamMemberIconStyle: { left: 5 },
  addMember: {
    backgroundColor: globalColors.orange,
    position: "absolute",
    height: "12%",
    width: "100%",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    bottom: 0,
    flexDirection: "row"
  },
  addTeamMember: {
    color: globalColors.white,
    fontFamily: "montserrat-bold",
    marginHorizontal: 10
  },
  contentContainer: {
    flexGrow: 1,
    marginTop: heightPercentageToDP(3)
  }
});
