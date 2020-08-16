import { StyleSheet, PixelRatio, Platform, I18nManager } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: "#f8f8f8",
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
  productDetailView: {
    paddingHorizontal: 15,
    flex: 1,
  },
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
  priceText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#75647C",
    lineHeight: 15,
    textAlign: "left",
  },
  pricesubhead: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#75647C",
    textTransform: "uppercase",
    marginTop: 4,
    textAlign: "left",
  },
  productNameText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#75647C",
    lineHeight: 15,
    textAlign: "left",
  },
  productNamesubhead: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#75647C",
    textTransform: "uppercase",
    marginTop: 4,
    textAlign: "left",
  },
  productCard: {
    // flex: 1,
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 20,
    marginVertical: 5,
    borderColor: "#707070",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productImage: {
    width: 105,
    height: 105,
    borderRadius: 20,
  },

  addProductText: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: globalColors.purple,
    marginHorizontal: 5,
  },
  myproductsText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#75647C",
  },
  myproductsView: {
    display: "flex",
    flexDirection: "row",
    marginHorizontal: 20,
    justifyContent: "space-between",
    marginBottom: 5,
  },
  addProductsView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  penIcon: { marginRight: 20 },
});
export default styles;
