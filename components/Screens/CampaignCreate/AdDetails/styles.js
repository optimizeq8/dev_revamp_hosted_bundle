import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../../Global Styles/";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  safeArea: {
    height: "100%",
    flex: 1
  },
  mainContainer: {
    backgroundColor: "#0000"
  },
  container: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "#000",
    marginTop: hp(2),
    overflow: "hidden",
    width: "100%",
    height: "100%",
    flex: 1
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    backgroundColor: "black",
    opacity: 0.2
  },
  imageBackgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    overflow: "hidden"
  },
  videoBackgroundViewWrapper: {
    width: "100%",
    height: "100%",
    opacity: 0.4,
    backgroundColor: "black"
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    // width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },

  textCon: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    textAlign: "center",
    paddingBottom: 10
    // height: 50
  },

  colorGrey: {
    color: "#fff"
  },
  budget: {
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 25,
    fontFamily: "montserrat-medium",
    textAlign: "center",
    width: "100%",
    paddingBottom: 20
  },

  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 17,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center",
    paddingTop: 10
  },
  slidercontainer: { marginHorizontal: 40, width: "100%" },
  input: {
    marginBottom: 15,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300
  },

  indicator: {
    fontSize: 30,
    marginRight: 20,
    color: "#fff"
  },
  itemCircles: {
    fontSize: 30,
    color: globalColors.orange
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "center",
    height: 40,
    width: 40,
    margin: 15
  },
  mainCard: {
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    borderColor: "transparent",
    flex: 1,
    overflow: "hidden",
    backgroundColor: "#000",
    marginLeft: 0,
    marginRight: 0
  },

  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  btnClose: {
    top: "30%"
  },

  dateInput: {
    marginBottom: 5,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 15,
    alignSelf: "center",
    width: 270,
    height: hp(7.7),
    justifyContent: "center",
    borderWidth: 0.5
  },

  chart: {
    alignItems: "center",
    // top: hp(10),
    // position: "absolute",
    alignSelf: "center"
    // justifyContent: "flex-end"
    // bottom: hp(42)
  },
  bottom: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row"
    // alignSelf: "center",
    // position: "absolute",
    // bottom: 0
    // bottom: hp(16),
  },
  chartText: {
    color: "#fff",
    fontFamily: "montserrat-semibold",
    fontSize: 16,
    textAlign: "center"
  },
  chartItems: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
    // top: hp(5)
    // left: wp(9)
  },
  button: {
    backgroundColor: "transparent",
    alignSelf: "center",
    borderRadius: 50,
    borderColor: "transparent",
    borderWidth: 1,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    top: heightPercentageToDP(5) < 30 ? -5 : 30
  },
  interestButton: {
    backgroundColor: globalColors.orange,
    alignSelf: "center",
    borderRadius: 50,
    height: 50,
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  icon: {
    fontSize: 70,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  editIcon: {
    fontSize: 20,
    color: globalColors.orange,

    alignSelf: "center"
  },
  inactivebutton: {
    alignSelf: "center",
    width: hp("15"),
    height: hp("15"),
    marginBottom: 10
  },
  activebutton: {
    alignSelf: "center",
    width: hp("15"),
    height: hp("15")
  },
  inactivetext: {
    fontFamily: "montserrat-bold",
    fontSize: 14,
    color: "#fff"
  },
  activetext: {
    fontFamily: "montserrat-semibold",
    fontSize: 16,
    color: globalColors.orange
  },
  categories: {
    textAlign: "center",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingVertical: 20
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingHorizontal: 10
  },
  headline: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-semibold",
    fontSize: 14,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignSelf: "center"
  },
  menutext: {
    paddingLeft: 15,
    fontSize: 13,
    fontFamily: "montserrat-light",
    color: "#fff",
    paddingVertical: 3
  },
  menudetails: {
    paddingLeft: 15,
    color: "#fff",
    fontFamily: "montserrat-extralight",
    fontSize: 11
  }
});

export default styles;
