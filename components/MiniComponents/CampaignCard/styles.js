import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { globalColors } from "../../../Global Styles";

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
    marginHorizontal: 20,
    borderRadius: 30,
    marginVertical: 8,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowColor: "#6268FF",
    shadowOffset: { height: 6, width: 0 },
    elevation: 5
  },
  text: {
    textAlign: "center",
    color: "#5F5F5F",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10,
    paddingVertical: 10
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
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: "70%",
    left: 5
  },

  subtext: {
    paddingTop: 5,
    fontFamily: "montserrat-semibold",
    fontSize: 10,
    color: "#fff"
  },
  campaignButton: {
    flex: 1,
    padding: 20,
    paddingVertical: 15
  },
  chart: {
    paddingHorizontal: 5,
    top: 15
  },
  chartText: {
    color: globalColors.orange,
    fontFamily: "montserrat-medium",
    fontSize: 12,
    marginLeft: 10
  },
  chartSubtext: {
    alignSelf: "center",
    paddingTop: 17,
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#fff",
    fontFamily: "montserrat-semibold"
  },
  containerStyle: {
    position: "absolute",
    left: "80%",
    top: "87%",
    backgroundColor: "transparent",
    borderRadius: 20
  },
  toggleStyle: {
    width: widthPercentageToDP(16),
    height: heightPercentageToDP(2.3),
    borderRadius: 20,
    padding: 0
  },
  icon: {
    position: "absolute",
    color: "#fff",
    left: "88%",
    fontSize: 40,
    top: "-3%"
  },
  contentContainer: {
    paddingTop: 30
  },
  reviewtext: {
    fontFamily: "montserrat-regular",
    fontSize: 13,
    padding: 3,
    color: "#fff"
  },
  campaignInfo: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: widthPercentageToDP(40),
    left: 10
  },
  campaignIcons: {
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "flex-end"
  },
  campaignNumbers: {
    top: 6,
    fontFamily: "montserrat-medium",
    right: 10
  },
  toggleTextLeft: {
    fontSize: 11,
    position: "absolute",
    top: -7,
    left: 12,
    fontFamily: "montserrat-light",
    color: "#fff"
  },
  toggleTextRight: {
    fontSize: 9.5,
    position: "absolute",
    top: -7,
    // left: 12,
    fontFamily: "montserrat-light",
    color: "#fff"
  }
});

export default styles;
