import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: { flex: 1, backgroundColor: "#0000" },
  mainCard: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    color: globalColors.white,
    marginVertical: 10,
  },
  description: {
    fontSize: 14,
    fontFamily: "montserrat-regular",
    color: globalColors.white,
    marginVertical: 10,
    width: "80%",
    textAlign: "center",
  },
  titleContainer: {
    alignSelf: "center",
    alignItems: "center",

    height: "100%",
    width: "100%",
  },
  icon: {
    color: globalColors.white,
    marginVertical: 10,
  },
  toggleStyle: {
    alignSelf: "center",
    marginVertical: 20,
    width: widthPercentageToDP("13"),
    height: heightPercentageToDP("2.7"),
    borderRadius: 25,
    padding: 0,
  },
  toggleCircle: {
    width: widthPercentageToDP("5"),
    height: heightPercentageToDP("2.4"),
    borderRadius: 50,
  },
  gradientButton: {
    width: "60%",
    height: "8%",
    minHeight: 50,
    marginVertical: 10,
  },
  gradientButtonBorder: {
    borderWidth: 1,
    borderColor: globalColors.rum,
    color: globalColors.rum,
  },
});

export default styles;
