import { StyleSheet } from "react-native";

import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  gradient: {
    position: "absolute",
    alignSelf: "center",
    height: heightPercentageToDP(100),
    width: widthPercentageToDP(100),
  },
  googleMainIcon: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.16,
    // elevation: 2
  },
  safeAreaView: {
    flex: 1,
  },
  createANewText: {
    fontFamily: "montserrat-bold",
    fontSize: 16,
    textAlign: "left",
    textTransform: "uppercase",
    paddingBottom: 12,
  },
  mediaIcon: {
    alignItems: "center",
    width: 55,
    height: 55,
    borderRadius: 50,
    marginHorizontal: 5,
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  activeMediaIcon: {
    borderColor: "#FF790A",
    borderWidth: 3,
  },
  headingText: {
    fontSize: 23,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    paddingVertical: 13,
    textAlign: "left",
  },
  campaignText: {
    textAlign: "left",
    color: "#FFF",
    fontSize: 14,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
  },
  lowerButton: {
    width: 37,
    height: 37,
    alignSelf: "flex-end",
    left: "-22%",
  },
  suitablePoints: {
    fontFamily: "montserrat-bold",
    fontSize: 10,
    lineHeight: 13,
    color: "#FF7A09",
    textAlign: "left",
    paddingHorizontal: 4,
    width: 120,
  },
  suitablePointsView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },
  suitableForText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    lineHeight: 16,
    marginTop: 12,
    marginBottom: 4,
    color: "#575757",
    textTransform: "uppercase",
    textAlign: "left",
  },
  description: {
    fontFamily: "montserrat-regular",
    fontSize: 10,
    color: "#909090",
    lineHeight: 17,
    textAlign: "left",
    width: widthPercentageToDP(50),
  },
  titleText: {
    fontFamily: "montserrat-bold",
    fontSize: 19,
    color: "#575757",
    textTransform: "uppercase",
    lineHeight: 21,
    paddingTop: 7,
    textAlign: "left",
  },
  descriptionView: {
    paddingLeft: 10,
    marginVertical: 20,
  },
  adTypeImage: {
    alignSelf: "flex-start",
    // marginLeft: 10,
    // paddingHorizontal: 20,
    marginVertical: 20,
  },
  cardView: {
    flexDirection: "row",
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    borderRadius: 35,
    marginVertical: 5,
  },
  scrollViewContent: {
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  selectADTypeText: {
    textTransform: "uppercase",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    color: "#909090",
    paddingTop: 20,
    paddingHorizontal: 28,
    textAlign: "left",
  },
  mainView: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    zIndex: 10,
    elevation: 10,
  },
  mainIcon: {
    position: "absolute",
    zIndex: -2,
    elevation: 0.15,
  },
  loginBtn: {
    height: 50,
    marginTop: 20,
    marginHorizontal: 20,
  },
});

export default styles;
