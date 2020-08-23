import { StyleSheet, PixelRatio, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  outerPreview: {
    height: heightPercentageToDP(70),
    backgroundColor: "rgba(0,0,0,0.16)",
    marginHorizontal: 15,
    borderRadius: 20,
    marginVertical: 15,
  },
  promoteText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    paddingHorizontal: 20,
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
  container: { marginBottom: 20 },
  lowerBtn: {
    top: "20%",
    width: "90%",
  },
});

export default styles;
