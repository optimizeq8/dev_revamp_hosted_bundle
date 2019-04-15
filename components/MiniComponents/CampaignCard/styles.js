import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import { widthPercentageToDP } from "react-native-responsive-screen";

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
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 25,
    borderRadius: 20,
    marginVertical: 10,
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
    position: "absolute",
    left: "87%",
    top: "87%",
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
    ...StyleSheet.absoluteFillObject,
    color: "#fff",
    left: widthPercentageToDP("63%"),
    fontSize: widthPercentageToDP("15%"),
    top: widthPercentageToDP("-3%")
  },
  contentContainer: {
    paddingTop: 30
  }
});

export default styles;
