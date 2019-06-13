import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#751AFF"
};
const styles = StyleSheet.create({
  title: { color: "#000", fontSize: 48 },
  container: {
    marginTop: 30,
    backgroundColor: "#751AFF"
  },
  image: {
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
  cardStyle: {
    justifyContent: "space-between",
    backgroundColor: "#FFFF",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 25,
    borderRadius: 25,
    marginVertical: 10,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#a0a0a0",
    shadowOffset: { height: 6, width: 0 },
    elevation: 5
  },
  text: {
    color: "#5F5F5F",
    fontFamily: "montserrat-medium",
    fontSize: 13,
    textAlign: "left",
    paddingTop: heightPercentageToDP(0.5)
  },
  datetext: {
    color: "#5F5F5F",
    fontFamily: "montserrat-medium",
    fontSize: 13,
    paddingTop: heightPercentageToDP(0.5)
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    paddingBottom: heightPercentageToDP(1)
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  titletext: {
    textAlign: "left",
    color: "#5F5F5F",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    paddingVertical: 0,
    width: 200
  },

  subtext: {
    paddingTop: heightPercentageToDP(0.25),
    paddingBottom: heightPercentageToDP(0.5),
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#a0a0a0"
  },
  transactionButton: {
    flex: 1,
    padding: 20
  },
  chart: {
    paddingHorizontal: 5,
    top: 15
  },
  chartText: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: 10
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 17,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff"
  },
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "transparent",
    borderRadius: 20
  },
  toggleStyle: {
    width: widthPercentageToDP(10),
    height: 20,
    borderRadius: 20,
    padding: 0
  },
  icon: {
    position: "absolute",
    color: "#a0a0a0",
    left: widthPercentageToDP("63%"),
    fontSize: widthPercentageToDP("15%"),
    top: widthPercentageToDP("-3%"),
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowColor: "#6268FF",
    shadowOffset: { height: 1, width: 0 },
    elevation: 5
  },
  contentContainer: {
    paddingTop: 30
  }
});

export default styles;
