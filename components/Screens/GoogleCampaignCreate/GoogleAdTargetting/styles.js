import { StyleSheet, Platform, PixelRatio } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../../GlobalStyles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    flex: 1,
    backgroundColor: "#0000"
  },
  mainContainer: {
    backgroundColor: "#0000"
  },
  container: {
    backgroundColor: "#0000",
    overflow: "hidden",
    width: "100%",
    height: "100%",
    flex: 1
  },
  contentContainer: {
    flex: 1
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 10
  },
  moneyInputContainer: {
    flexDirection: "column",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 15,
    alignSelf: "center",
    justifyContent: "space-around",
    paddingVertical: 10
  },
  budget: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 25 / PixelRatio.getFontScale(),
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    paddingBottom: 0,
    width: "100%"
  },
  moreOptionsText: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    paddingBottom: 30
  },
  budgetInstructionText: {
    color: "#fff",
    fontSize: 11,
    alignSelf: "center",
    paddingHorizontal: 20
  },
  sliderContainer: {
    marginHorizontal: 40,
    width: "100%",
    alignSelf: "center",
    paddingVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 40
  },
  budgetSliderText: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    paddingBottom: 10
  },
  slider: {
    width: "100%",
    height: 20
  },
  sliderPlaceHolder: {
    height: 75,
    justifyContent: "center"
  },
  targetList: {
    flexDirection: "column",
    marginHorizontal: 40,
    paddingBottom: 50
  },
  targetTouchable: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8
  },
  icon: {
    alignSelf: "center"
  },
  menutext: {
    paddingLeft: 15,
    fontSize: 13,
    fontFamily: "montserrat-light",
    color: "#fff",
    textAlign: "left"
  },
  menudetails: {
    textAlign: "left",
    paddingLeft: 15,
    color: "#fff",
    fontFamily: "montserrat-extralight",
    fontSize: 11
  },
  keywordsColumn: {
    flexDirection: "column",
    alignItems: "center"
  },
  editButton: {
    overflow: "hidden",
    justifyContent: "center",
    height: 26,
    backgroundColor: "#0000",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    borderColor: "#fff",
    borderWidth: 1
  },
  editButtonText: {
    marginRight: 0,
    paddingHorizontal: 20,
    fontSize: 12,
    fontFamily: "montserrat-regular",
    alignSelf: "center",
    color: "#fff",
    textAlign: "center"
  },
  keywordButton: {
    overflow: "hidden",
    justifyContent: "center",
    height: 26,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    margin: 3,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0
  },
  keywordButtonText: {
    marginRight: 0,
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "montserrat-bold",
    alignSelf: "center",
    color: "#fff",
    textAlign: "center"
  },
  xIcon: {
    color: "#fff",
    fontSize: 20,
    marginRight: 10
  },
  keywordScrollView: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 15
    // marginHorizontal: 40
    // marginBottom: heightPercentageToDP(35)
    // height: "10%"
  },
  keywordsAddButton: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    borderRadius: 50,
    height: 35,
    width: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: -1
  }
});

export default styles;
