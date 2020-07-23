import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  onlineStoreHomeIcon: {
    position: "absolute",
    bottom: "-6%",
    left: -10,
    zIndex: -1,
  },
  createWebsiteText: {
    alignSelf: "center",
  },
});
export default styles;
