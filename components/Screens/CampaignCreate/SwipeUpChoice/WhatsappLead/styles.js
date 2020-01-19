import { StyleSheet, Platform, PixelRatio } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1
  },
  container: {
    backgroundColor: "transparent",
    // marginTop: 0,
    // height: '100%',
    flex: 1
    // marginBottom: heightPercentageToDP(35),
  },
  bottonViewWebsite: {
    marginBottom: heightPercentageToDP(35)
  },
  websiteView: {
    alignItems: "center",
    width: "100%"
  },
  websiteLabelView: {
    borderTopLeftRadius: 150,
    borderTopRightRadius: 150,
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    paddingTop: 8,
    width: 150,
    alignSelf: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    height: 15,
    zIndex: 1
  },
  input: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    borderRadius: 40,
    borderColor: "transparent",
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 0,
    width: 270
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14 / PixelRatio.getFontScale(),
    alignSelf: "center",
    textAlign: "center",
    color: "#FFF",
    borderColor: "transparent"
  },
  inputLabel: {
    fontFamily: "montserrat-bold",
    fontSize: 12 / PixelRatio.getFontScale(),
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    borderRadius: 30,
    marginBottom: -10
  },
  inputContainer: {
    marginTop: 30
  },
  contentStyle: {
    paddingTop: 20,
    flexGrow: 1
  },
  addProductPriceText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 40
  },
  contentContainerStyle: {
    flexDirection: "row",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center"
  },
  productView: {
    alignItems: "center",
    marginVertical: 5,
    width: "38%",
    borderRadius: 20,
    marginHorizontal: 10,
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  productImageView: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center"
  },
  imageView: {
    width: wp(34),
    height: 135,
    borderRadius: 20,
    // backgroundColor: "rgba(0,0,0,0.2)",
    opacity: 0.9
  },
  productNameText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 17,
    paddingTop: 15,
    textAlign: "left",
    alignSelf: "flex-start",
    marginLeft: 12
  },
  priceView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "flex-start",
    marginLeft: 12
  },
  kdText: {
    fontFamily: "montserrat-bold-english",
    color: "#FF9D00",
    fontSize: 12,
    lineHeight: 22,
    paddingBottom: 5
  },
  priceText: {
    fontFamily: "montserrat-bold-english",
    color: "#FF9D00",
    fontSize: 17,
    lineHeight: 22,
    paddingBottom: 5
  },
  editTouchView: {
    width: 20,
    height: 20,
    alignSelf: "flex-end",
    marginRight: 10,
    marginBottom: 10
  },
  penIcon: {
    width: 20,
    height: 20
  },
  viewMoreText: {
    fontFamily: "montserrat-bold",
    color: "#FFF",
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 10,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    borderRadius: 20,
    marginHorizontal: 60,
    marginBottom: 20
  },
  selectProductText: {
    fontFamily: "montserrat-regular",
    color: "#FFF",
    fontSize: 14,
    lineHeight: 18,
    paddingVertical: 10,
    textAlign: "center"
  },
  itemView: {
    width: 40,
    borderRadius: 40,
    height: 40,
    marginBottom: -25,
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  itemFoundText: {
    textAlign: "center",
    color: "#FFF"
  },
  itemProductView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 4,
    // marginHorizontal: "auto",
    paddingHorizontal: 8,
    alignSelf: "flex-start"
  },
  imageProduct: {
    width: 95,
    height: 95,
    borderRadius: 20
  },
  promoteCampaignText: {
    color: "#FFF",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 60
  },
  contentView: {
    paddingTop: 20,
    // paddingHorizontal: 20,
    flexGrow: 1
    // marginBottom: heightPercentageToDP(30),
  },

  mainProductView: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 20
  },
  imageProductView: {
    width: 250,
    height: 250,
    borderRadius: 20
  }
});

export default styles;
