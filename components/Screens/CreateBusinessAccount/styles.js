import { StyleSheet } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";
const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#0000",
  },
  businessView: {
    paddingBottom: "30%",
    paddingTop: 13,
    paddingHorizontal: 20,
  },
  bottomCard: {
    justifyContent: "center",
    alignSelf: "center",
    height: 54,
    width: widthPercentageToDP(90),
    marginHorizontal: 26,
    // marginBottom: 30
  },
  subHeading: {
    fontSize: RFValue(9.5, 414),
    color: "#FFF",
    fontFamily: "montserrat-bold",
    marginLeft: RFValue(8, 414),
    textTransform: "uppercase",
  },
  subHeadView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 26,
    marginVertical: RFValue(7.5, 414),
  },
  changeInstagramPageText: {
    textAlign: "center",
    color: globalColors.white,
    fontSize: RFValue(7, 414),
    paddingBottom: RFValue(10, 414),
    fontFamily: "montserrat-bold",
    textDecorationLine: "underline",
  },
});

export default styles;
