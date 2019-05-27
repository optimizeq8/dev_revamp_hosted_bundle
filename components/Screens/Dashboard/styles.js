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
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 16,
    width: 150,
    paddingTop: 20,
    alignSelf: "center"
  },
  container: {
    top: heightPercentageToDP(6)
  },
  image: {
    alignSelf: "center",
    height: heightPercentageToDP(10),
    width: heightPercentageToDP(15),
    bottom: heightPercentageToDP(3.5)
  },
  imageIcon: {
    alignSelf: "center",
    height: 50,
    width: 50
  },
  mainCard: {
    backgroundColor: "#F4F4F4",
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    width: "100%",
    height: "100%"
  },
  backDrop: {
    position: "absolute",
    top: -heightPercentageToDP("45%"),
    alignSelf: "center"
  },
  text: {
    alignSelf: "center",
    // bottom: "50%",
    color: "#fff",
    fontFamily: "montserrat-semibold",
    fontSize: 22
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
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    marginHorizontal: 20,
    height: 55,
    borderRadius: 33,
    elevation: 0
  },
  link: {
    marginTop: 20,
    textAlign: "center",
    color: "#5F5F5F",
    fontFamily: "montserrat-regular",
    fontSize: 20
  },
  bottomCard: {
    top: 15,
    backgroundColor: "#fff",
    shadowColor: "#6C6C6C",
    shadowRadius: 1,
    shadowOpacity: 0.7,
    shadowOffset: { width: 8, height: 8 },
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
    height: 100
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },

  textcontainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    paddingHorizontal: 7
  },
  titletext: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 10,
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingVertical: 0
  },
  subtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingTop: 25,
    color: "#fff",
    textAlign: "center"
  },
  campaignButton: {
    justifyContent: "space-between",
    flexDirection: "row",
    flex: 1,
    marginHorizontal: 25,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    backgroundColor: "#FF9D00",
    padding: 10,
    marginBottom: 20,
    bottom: 15
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    fontSize: 40,
    paddingVertical: 10,
    paddingHorizontal: 7
  },
  contentContainer: {
    paddingTop: 30
  },
  checkbutton: {
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 55,
    height: 55,
    borderRadius: 27.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: 5
  },
  activebutton: {
    backgroundColor: "#fff",
    alignSelf: "center",
    justifyContent: "center",
    width: 55,
    height: 55,
    borderRadius: 33,
    top: 30,
    marginBottom: 10,
    elevation: 0
  },
  dateInput: {
    marginBottom: 15,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 15,
    alignSelf: "center",
    width: 270,
    height: 65,
    justifyContent: "center"
  },
  categories: {
    textAlign: "center",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium",
    fontSize: 16,
    paddingHorizontal: 10
  },
  dateModal: {
    ...StyleSheet.absoluteFillObject,
    height: heightPercentageToDP("100%"),
    marginTop: 0
  },
  wallet: {
    // top: "50%",
    right: 5,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 50,
    height: 50
  }
});

export default styles;
