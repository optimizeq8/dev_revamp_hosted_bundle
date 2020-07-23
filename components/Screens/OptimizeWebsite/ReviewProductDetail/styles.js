import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  outerView: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  safeAreaViewContainer: {
    // flex: 1,
  },
  feildView: { display: "flex", flexDirection: "row", marginVertical: 8 },
  plusIconView: {
    borderColor: globalColors.purple,
    borderWidth: 1,
    width: 17,
    height: 17,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#9300FF50",
  },
  subHeading: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#75647C",
    textTransform: "uppercase",
  },
  subText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#75647C",
    marginTop: 4,
  },
  previewBtn: {
    borderColor: "#75647C",
    borderWidth: 1,
    height: 50,
    width: "35%",
  },
  saveBtn: {
    height: 50,
    width: "50%",
  },
  previewText: {
    color: "#75647C",
    fontSize: 14,
    fontFamily: "montserrat-bold",
  },
  imageViewContainer: {
    marginHorizontal: 10,
    flexDirection: "row",
    // height: 250,
  },
  image: {
    width: 140,
    height: 230,
    borderRadius: 20,
    marginHorizontal: 5,
  },
});
export default styles;
