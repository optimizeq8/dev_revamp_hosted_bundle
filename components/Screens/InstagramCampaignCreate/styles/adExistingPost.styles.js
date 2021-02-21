import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  outerPreview: {
    height: heightPercentageToDP(70),
    backgroundColor: "rgba(0,0,0,0.16)",
    marginHorizontal: RFValue(7.5, 414),
    borderRadius: RFValue(10, 414),
    marginVertical: RFValue(7.5, 414),
  },
  promoteText: {
    color: "#FFF",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-regular",
    paddingHorizontal: RFValue(10, 414),
    textAlign: "left",
  },
  flatListContentStyle: {
    display: "flex",
    marginBottom: heightPercentageToDP(20),
    justifyContent: "space-around",
    alignItems: "center",
  },
  bottomView: {
    width: "45%",
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  scrollContent: {
    paddingTop: "5%",
    paddingBottom: "25%",
    alignItems: "center",
  },
  scrollView: { height: "100%" },
  container: { marginBottom: RFValue(10, 414) },
  lowerBtn: {
    top: "20%",
    width: "90%",
  },
});

export default styles;
