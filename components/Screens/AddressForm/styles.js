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
  container: {
    backgroundColor: "#0000"
  },
  title: {
    fontSize: widthPercentageToDP(5),
    color: "#fff",
    textAlign: "center",
    paddingTop: 20,
    textAlign: "center",
    fontFamily: "montserrat-medium"
  },
  // mainCard: {
  //   borderTopStartRadius: 30,
  //   borderTopEndRadius: 30,
  //   backgroundColor: "#fff",
  //   borderColor: "transparent",
  //   flex: 1,
  //   top: heightPercentageToDP(23),
  //   shadowColor: "#6C6C6C",
  //   shadowRadius: 5,
  //   shadowOpacity: 0.1,
  //   shadowOffset: { width: 0, height: -3 }
  // },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    bottom: heightPercentageToDP(20),
    backgroundColor: "#FF9D00",
    alignSelf: "center",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderColor: "transparent",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2
  },
  contentContainer: {
    paddingVertical: 40,
    flex: 1,
    justifyContent: "space-around"
  },
  closeIcon: {
    top: heightPercentageToDP(4),
    left: widthPercentageToDP(7),
    zIndex: 10,
    elevation: 5
  },
  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    fontFamily: "montserrat-regular",
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginBottom: 40
  },
  inputtext: {
    fontFamily: "montserrat-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    alignSelf: "center",
    justifyContent: "center",
    width: 100,

    borderColor: "#7039FF",
    flexDirection: "row"
  },
  selector: {
    bottom: 25,
    alignSelf: "center",
    justifyContent: "center",
    width: 250,
    borderColor: "#7039FF",
    flexDirection: "row"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  }
});

export default styles;
