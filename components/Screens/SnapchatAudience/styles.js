import { StyleSheet, Platform, PixelRatio, I18nManager } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  targetList: {
    flexDirection: "column",
    paddingBottom: 40,
    height: "100%",
    // marginHorizontal: 30,
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    backgroundColor: "#fff",
    borderRadius: 50,
    padding: 10,
  },
  icon: {
    alignSelf: "center",
  },
  menutext: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    fontSize: 13,
    fontFamily: "montserrat-bold",
    color: globalColors.gray,
    textAlign: "left",
    textTransform: "uppercase",
  },
  menudetails: {
    paddingLeft: Platform.OS === "android" && I18nManager.isRTL ? 0 : 15,
    paddingRight: Platform.OS === "android" && I18nManager.isRTL ? 15 : 0,
    color: globalColors.gray,

    fontFamily: "montserrat-regular",
    fontSize: 11,
    textAlign: "left",
  },
});

export default styles;
