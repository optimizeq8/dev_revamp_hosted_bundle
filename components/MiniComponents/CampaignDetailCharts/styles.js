import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
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
    backgroundColor: "transparent",
    // flex: 1,
    alignItems: "center"
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
    width: wp("100%"),
    height: hp("20%"),
    // flexDirection: "row",
    borderRadius: 30,
    alignSelf: "center"
  },

  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 25,
    paddingBottom: 20,
    fontFamily: "montserrat-medium",
    fontSize: 18
  },
  buttontext: {
    fontFamily: "montserrat-regular",
    fontSize: 14
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50
  },
  button: {
    top: 30,
    marginBottom: 10,
    backgroundColor: "#5F5F5F",
    alignSelf: "center"
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#5F5F5F",
    fontFamily: "montserrat-regular",
    fontSize: 20
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  header: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 0
  },
  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start"
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingVertical: 0,
    width: "50%"
  },

  subtext: {
    paddingTop: 10,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff"
  },
  campaignButton: {
    flex: 1,
    padding: 20
  },
  chart: {
    alignItems: "center",
    paddingHorizontal: 5
  },
  chartText: {
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    marginLeft: 10
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 10,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff"
  },
  containerStyle: {
    ...StyleSheet.absoluteFillObject,
    left: "73%",
    top: "80%"
  },
  toggleStyle: {
    left: "80%",
    width: 60,
    height: 30,
    borderRadius: 20,
    padding: 5
  },
  circleStyle: {
    width: 25,
    height: 25,
    borderRadius: 19,
    backgroundColor: "white"
  },
  icon: {
    ...StyleSheet.absoluteFillObject,
    left: wp("26%"),
    top: hp("1.7%")
  },
  contentContainer: {
    paddingTop: 30
  },
  campaignIcons: {
    left: 10,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  campaignNumbers: {
    top: 6,
    fontFamily: "montserrat-medium",
    right: 10
  },
  campaignInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: wp(40),
    left: 10
  },
  tab: {
    position: "absolute",
    // backgroundColor: "red",
    bottom: 130,
    alignSelf: "center",
    width: wp("63%"),
    borderRadius: 30
  }
});

export default styles;
