import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";
import { RFValue } from "react-native-responsive-fontsize";

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
  toggleConatiner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0002",
    width: "85%",
    height: 60,
    borderRadius: 30,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  toggleText: {
    fontSize: 15,
    fontFamily: "montserrat-regular",
    color: globalColors.white,
  },
  switchButtonText: {
    fontSize: RFValue(5, 414),
    color: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "montserrat-bold",
  },
  toggleStyle: {
    marginTop: 0,
    width: widthPercentageToDP("15"),
    height: heightPercentageToDP("3"),
    borderRadius: RFValue(12.5, 414),
    padding: 0,
  },
  switchCircle: {
    width: widthPercentageToDP("7.5"),
    height: heightPercentageToDP("3"),
    borderRadius: 25,
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default styles;
