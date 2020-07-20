import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  block: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headingBlock: {
    backgroundColor: globalColors.orange,
    width: hp(5) < 30 ? 30 : 60,
    // width: 70,
    paddingVertical: 5,
    paddingHorizontal: 5,
    height: 25,
    borderRadius: 20,
    marginBottom: -15,
    zIndex: 1,
    alignItems: "center",
    // flex: 1
  },
  productText: {
    fontSize: 10,
    textAlign: "center",
    width: "100%",
    fontFamily: "montserrat-bold",
    color: "#FFF",
  },
  touchViewBlock: {
    alignSelf: "center",
    borderColor: globalColors.orange,
    borderWidth: 2,
    width: hp(5) < 30 ? 30 : 60,
    height: hp(5) < 30 ? 30 : 60,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  imageCache: {
    borderRadius: 18,
    alignSelf: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  addButton: {
    width: hp(5) < 30 ? 20 : 30,
    height: hp(5) < 30 ? 20 : 30,
    alignSelf: "center",
    borderRadius: hp(5) < 30 ? 20 : 30,
    backgroundColor: globalColors.orange,
  },
  penView: { position: "absolute", bottom: 6, right: 6 },
});
export default styles;
