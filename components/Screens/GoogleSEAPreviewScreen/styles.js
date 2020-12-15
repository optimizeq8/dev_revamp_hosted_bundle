import { StyleSheet, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
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
    elevation: 5,
    shadowOffset: { width: 5, height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    shadowColor: "#000",
  },
  searchImage: {
    width: 322,
    height: 43,
    alignSelf: "center",
  },
  phoneImage: {
    width: 276,
    height: 551,
    alignSelf: "center",
  },
  editButton: {
    marginHorizontal: 5,
    borderWidth: 1.5,
    borderColor: globalColors.white,
    height: 50,
    width: "40%",
  },
  nextButton: {
    height: 50,
    marginHorizontal: 5,
    width: "40%",
  },
  bottomView: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  forwardLoading: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 15,
  },
  forwardLoadingMainView: {
    marginHorizontal: 20,
    width: wp(6),
    height: hp(6),
  },
  forwardLoadingStyle: { width: wp(6), height: hp(6) },
});

export default styles;
