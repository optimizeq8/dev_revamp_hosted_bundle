import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  contentContainerStyle1: {},
  videoView: {
    height: "100%"
  },
  video: {
    width: "100%",
    height: "100%",
    borderRadius: 30
    // backgroundColor: "rgba(0,0,0,0.15)"
  },
  imageBackground: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    flex: 1,
    borderRadius: 30,
    backgroundColor: "rgba(0,0,0,0.6)"
  },
  budgetView: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 12
  },
  budgetText: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#FFFFFF",
    textTransform: "uppercase"
  },
  budgetAmountView: {
    display: "flex",
    flexDirection: "row"
  },
  budgetDollarText: {
    color: "#FFFFFF",
    fontFamily: "montserrat-medium",
    fontSize: 14
  },
  budgetAmountText: {
    color: "#FF9D00",
    fontFamily: "montserrat-bold",
    fontSize: 24
  },
  contentContainerStyle: {
    paddingHorizontal: 5
  },
  footerBlock: {
    paddingBottom: 10,
    margin: 0,
    borderTopWidth: 0,
    height: 100,
    backgroundColor: "#FFF",
    borderTopStartRadius: 35,
    borderTopEndRadius: 35,
    marginLeft: 0,
    marginRight: 0,
    width: "100%"
  },
  optimizeFeesPercentange: {
    color: "#C6C6C6",
    fontFamily: "montserrat-bold",
    fontSize: 12,
    paddingRight: 2
  },
  safeAreaView: {
    height: "100%",
    width: "100%"
    // backgroundColor: "rgba(0,0,0,0.75)"
  },
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: { color: "#000", fontSize: 48 },
  container: {
    height: "100%",
    backgroundColor: "transparent",
    flex: 1,
    width: "100%",
    display: "flex",
    overflow: "hidden",
    justifyContent: "space-between"
  },
  media: {
    alignSelf: "center",
    height: 120,
    width: 120,
    margin: 15
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50
  },

  mainCard: {
    // top: 20,
    // borderColor: "#FF9D00",
    backgroundColor: "#FF9D00",
    shadowRadius: 5,
    shadowOpacity: 0.2,
    height: 45,
    width: widthPercentageToDP(50),
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 30,
    justifyContent: "center"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingBottom: 10,
    fontFamily: "montserrat-medium",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10
  },

  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  bottomCardBlock1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingRight: 40,
    paddingLeft: 55,
    paddingTop: 15
  },
  dollarAmountContainer: {
    flexDirection: "row"
    // alignItems: 'baseline',
  },
  dollarAmountText: {
    fontSize: 15,
    color: "#FF9D00"
  },
  kdAmountContainer: {
    flexDirection: "row",
    // alignItems: 'center',
    paddingTop: 2
  },
  kdText: {
    fontSize: 11,
    color: "#C6C6C6",
    fontFamily: "montserrat-bold"
  },
  kdAmountText: {
    fontSize: 13,
    fontFamily: "montserrat-bold",
    paddingLeft: 4,
    color: "#C6C6C6"
  },
  optimizeFeesTextContainer: {
    flexDirection: "row",
    paddingTop: 10
    // width: '70%',
  },
  optimizeFeesText: {
    color: "#C6C6C6",
    fontSize: 12,
    fontFamily: "montserrat-light"
    // textAlign: 'left',
  },
  payNowText: {
    color: "#FFF",
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-bold"
    //   paddingBottom: 3
  },
  money: {
    color: "#FF9D00",
    // textAlign: 'center',
    fontSize: 21,
    fontFamily: "montserrat-bold"
    // paddingTop: 3
  },
  feesAmountText: {
    color: "#fff",
    textAlign: "left",
    fontSize: 12,
    fontFamily: "montserrat-bold"
  }
});

export default styles;
