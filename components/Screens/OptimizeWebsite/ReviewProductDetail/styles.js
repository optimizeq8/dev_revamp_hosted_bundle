import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";

const styles = StyleSheet.create({
  closeButton: {
    zIndex: 1,
    position: "absolute",
    top: 50,
    left: 20,
    width: 25,
    height: 25,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  productView: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    paddingTop: 20,
    paddingHorizontal: 15,
  },
  priceView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",

    backgroundColor: "#FFF",
    // borderWidth: 2,

    paddingVertical: 20,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 5,
    marginTop: -50,
  },
  buyBtn: { height: 54, width: "45%" },
  priceText: {
    fontSize: 16,
    fontFamily: "montserrat-bold",
    color: "#A496AC",
    textTransform: "uppercase",
  },
  priceAmountText: {
    fontSize: 16,
    fontFamily: "montserrat-bold",
    color: globalColors.purple,

    textTransform: "uppercase",
  },
  productDesc: {
    fontSize: 12,
    fontFamily: "montserrat-regular",
    color: "#A496AC",
    paddingLeft: 10,
  },
  productName: {
    fontSize: 25,
    fontFamily: "montserrat-bold",
    color: "#A496AC",
    textTransform: "capitalize",
    marginBottom: 5,
  },
  priceAmountBigText: {
    fontSize: 23,
    fontFamily: "montserrat-bold",
    color: globalColors.purple,
    textTransform: "uppercase",
  },
  outerView: {
    flex: 1,
    // backgroundColor: "#f8f8f8",
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
    // width: "100%",
    // height: 200,
    flex: 1,
    marginBottom: -50,
    // position: "absolute",
  },
});
export default styles;
