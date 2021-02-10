import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaView: {
    backgroundColor: "#0000",
    height: "100%",
    flex: 1,
  },
  container: {
    backgroundColor: "#0000",
  },
  mainContent: {
    height: "100%",
    flex: 1,
    justifyContent: "center",
    alignContent: "flex-start",
    alignItems: "flex-start",
  },
  container1: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "space-around",
    alignItems: "center",
    alignContent: "space-around",
  },
  searchResult: {
    width: "100%",
    height: "100%",
  },
  searchBar: {
    elevation: RFValue(2.5, 414),
    shadowOffset: { width: RFValue(2.5, 414), height: 5 },
    shadowRadius: RFValue(7.5, 414),
    shadowOpacity: 0.2,
    shadowColor: "#000",
  },
  searchImage: {
    width: RFValue(161, 414),
    height: RFValue(21.5, 414),
    alignSelf: "center",
  },
  phoneImage: {
    width: RFValue(138, 414),
    height: RFValue(275.5, 414),
    alignSelf: "center",
  },
  editButton: {
    marginHorizontal: RFValue(2.5, 414),
    borderWidth: 1.5,
    borderColor: globalColors.white,
    height: RFValue(25, 414),
    width: "40%",
  },
  nextButton: {
    height: RFValue(25, 414),
    marginHorizontal: RFValue(2.5, 414),
    width: "40%",
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: RFValue(7.5, 414),
  },
  forwardLoading: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: RFValue(7.5, 414),
  },
  forwardLoadingMainView: {
    marginHorizontal: RFValue(10, 414),
    width: wp(6),
    height: hp(6),
  },
  forwardLoadingStyle: { width: wp(6), height: hp(6) },
});

export default styles;
