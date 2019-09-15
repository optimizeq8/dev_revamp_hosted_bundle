import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  slide: {
    alignItems: "center",
    justifyContent: "center"
  },
  slideIcon: {
    top: 5,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5
  },
  iconTitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    bottom: 1.5,
    textAlign: "center",
    fontFamily: "montserrat-bold"
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#0000"
  },
  container: {
    flex: 1,
    backgroundColor: "#0000"
  },
  text: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "montserrat-bold",
    fontSize: 17,
    paddingVertical: 10,
    bottom: 5
  },
  slidTitle: {
    fontSize: 19,
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold"
  },
  placeholder: {
    backgroundColor: "#fff",
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    width: "100%",
    height: "90%",
    zIndex: 0,
    marginTop: 10,
    backgroundColor: "black",
    justifyContent: "center"
  },
  slideText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    zIndex: 10
  },
  typeCardContainer: {
    top: "0%",
    width: "100%",
    height: "95%",
    bottom: "5%",
    paddingTop: 10,
    alignSelf: "center"
  },
  media: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  }
});

export default styles;
