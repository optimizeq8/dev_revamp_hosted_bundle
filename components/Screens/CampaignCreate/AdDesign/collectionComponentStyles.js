import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  block: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  headingBlock: {
    backgroundColor: globalColors.orange,
    width: RFValue(30, 414),
    // width: 70,
    paddingVertical: RFValue(2.5, 414),
    paddingHorizontal: RFValue(2.5, 414),
    height: RFValue(12.5, 414),
    borderRadius: RFValue(10, 414),
    marginBottom: RFValue(-7.5, 414),
    zIndex: 1,
    alignItems: "center",
    // flex: 1
  },
  productText: {
    fontSize: RFValue(5, 414),
    textAlign: "center",
    width: "100%",
    fontFamily: "montserrat-bold",
    color: "#FFF",
  },
  touchViewBlock: {
    alignSelf: "center",
    borderColor: globalColors.orange,
    borderWidth: 2,
    width: RFValue(30, 414),
    height: RFValue(30, 414),
    borderRadius: RFValue(12.5, 414),
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
    width: RFValue(12, 414),
    height: RFValue(12, 414),
    alignSelf: "center",
    borderRadius: RFValue(15, 414),
    backgroundColor: globalColors.orange,
  },
  penView: { position: "absolute", bottom: 6, right: 6 },
});
export default styles;
