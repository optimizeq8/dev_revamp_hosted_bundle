import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { globalColors } from "../../../../Global Styles";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF"
};
const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    display: "flex",
    justifyContent: "space-between"
  },
  block1: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    width: wp(100),
    paddingTop: 10
  },
  block1Title: {
    top: hp(5),
    zIndex: 1
    // paddingRight: 35
    // marginLeft: "auto",
    // marginRight: "auto"
    // flex: 5
  },
  selectObjectiveTitle: {
    paddingTop: 30
  },
  innerBlock1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    // width: "100%"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  backDrop: {
    position: "absolute",
    top: -hp("50%"),
    alignSelf: "center"
  },
  backButton: {
    position: "absolute",
    top: hp(5),
    left: wp(0),
    zIndex: 10,
    width: 80,
    height: 40,
    alignItems: "center"
  },
  backbuttonicon: {
    justifyContent: "center",
    // top: 25,
    marginLeft: 20
  },
  title: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-semibold"
  },
  phoneicon: {
    // justifyContent: "center",
    alignSelf: "center",
    marginTop: 60
  },
  maincontent: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 40
  },
  input1: {
    marginBottom: 30,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
  },
  inputtext: {
    fontFamily: "montserrat-regular",
    fontSize: 14,
    color: "#fff",
    alignSelf: "center",
    textAlign: "center"
  },
  subtext: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-extralight",
    fontSize: 12
  },
  text: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 30,
    paddingBottom: 10,
    fontFamily: "montserrat-bold",
    fontSize: 14,
    paddingHorizontal: 10
  },
  input2: {
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 250,
    height: 50,
    marginTop: 10,
    marginBottom: 20
  },
  downicon: {
    color: "#fff",
    fontSize: 20
    // left: 5
  },
  button: {
    alignSelf: "center",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    marginVertical: hp(20)
  },
  icon: {
    fontSize: 35,
    color: "#fff",
    paddingLeft: 5,
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  popupOverlay: {
    height: "100%"
    // flex: 1
  },
  popupContent: {
    // marginTop: 10
  },
  modaltitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontFamily: "montserrat-medium",
    paddingVertical: 15
  },
  modalclosebtn: {
    marginRight: 30,
    alignSelf: "flex-end"
  },
  closeicon: {
    justifyContent: "center",
    top: 25
  },
  categories: {
    textAlign: "center",
    color: globalColors.orange,
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: 13,
    paddingHorizontal: 10
  },
  date: { fontFamily: "montserrat-medium", color: "#fff" },
  dateInput: {
    marginBottom: 5,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 15,
    alignSelf: "center",
    width: 270,
    height: hp(7),
    justifyContent: "center",
    borderWidth: 0.5
  }
});

export default styles;
