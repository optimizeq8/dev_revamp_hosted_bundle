import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  image: {
    alignSelf: "center",
    height: hp("5"),
    width: hp("5")
  },

  mainCard: {
    top: hp("2"),
    borderColor: "transparent",
    backgroundColor: "transparent",
    flex: 1,
    shadowRadius: 0,
    shadowOpacity: 0,
    marginLeft: 0,
    marginRight: 0,
    elevation: -10,
    zIndex: -1
  },
  text: {
    textAlign: "center",
    color: "#fff",
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

  button: {
    alignSelf: "center",
    backgroundColor: "transparent",
    position: "absolute",
    bottom: hp("5%"),
    elevation: 0
  },

  categories: {
    textAlign: "center",
    color: "#fff",
    flexDirection: "column",
    fontFamily: "montserrat-regular",
    fontSize: hp("2"),
    paddingHorizontal: 10
  },
  subHeadings: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-semibold",
    fontSize: hp("2.3"),
    paddingVertical: hp("1")
  },

  title: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: hp("2.45"),
    width: 150,
    alignSelf: "center"
  },
  chartTitle: {
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 20,
    width: 150
  },
  subtext: {
    fontFamily: "montserrat-extralight",
    fontSize: 14,
    paddingTop: 5,
    color: "#fff"
    // textAlign: "left"
  },
  numbers: {
    textAlign: "center",
    color: "#FF9D00",
    fontFamily: "montserrat-medium",
    fontSize: hp("2.5"),
    paddingHorizontal: 10
  },
  toggleSpace: {
    top: hp("2"),
    height: hp("10")
  },
  icon: {
    flexDirection: "column",
    alignSelf: "center",
    color: "#FF9D00",
    fontSize: 25,
    bottom: 5
  },
  gender: {
    // ...StyleSheet.absoluteFillObject,
    left: 17,

    top: 5,

    transform: [{ rotate: "-45deg" }]
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#000"
  },
  backgroundViewWrapper: {
    ...StyleSheet.absoluteFillObject
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  toggleStyle: {
    marginTop: 0,
    width: wp("28"),
    height: hp("4"),
    borderRadius: 25,
    padding: 0
  },
  circleStyle: {
    width: 25,
    height: 25,
    borderRadius: 19
  },

  btnClose: {
    position: "absolute",
    top: hp("10%"),
    left: wp("10%"),
    height: 100,
    width: 100
  },
  BlurView: {
    height: "100%",
    paddingTop: hp("20%")
  },
  pauseDes: {
    fontFamily: "montserrat-light",
    fontSize: wp("4%"),

    marginVertical: 20,
    padding: 20
  },
  dragHandler: {
    // alignSelf: "stretch",
    // height: 64,
    alignItems: "center",
    justifyContent: "center"
  },
  bottomContainer: {
    // flex: 1,
    width: wp("100"),
    // height: hp("100"),
    elevation: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  tab: {
    // position: "absolute",
    // backgroundColor: "red",
    bottom: -43,
    alignSelf: "center",
    width: wp("63%"),
    borderRadius: 30,
    paddingBottom: 20
  },
  handlerIcon: {
    ...StyleSheet.absoluteFillObject,
    left: wp("26%"),
    top: hp("1.7%")
  },
  handlerText: {
    textAlign: "center",
    color: "#fff",
    paddingTop: 25,
    paddingBottom: 20,
    fontFamily: "montserrat-medium",
    fontSize: 18
  },
  chartPosition: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
