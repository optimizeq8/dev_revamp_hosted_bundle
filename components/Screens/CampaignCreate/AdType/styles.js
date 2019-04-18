import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const styles = StyleSheet.create({
  slide: { alignItems: "center", flex: 1, justifyContent: "center" },
  container: {
    paddingTop: hp(5),
    flex: 1,
    backgroundColor: "#751AFF"
  },

  text: {
    textAlign: "center",
    color: "#717171",
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: "montserrat-regular",
    fontSize: 15,
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  title: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    paddingTop: hp(2),
    textAlign: "center",
    fontFamily: "montserrat-semibold"
  },
  slidtitle: {
    fontSize: hp(2.4),
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-semibold"
  },
  slideicon: {
    fontSize: hp(6),
    color: "#fff",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 5
  },
  slidetext: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    paddingTop: 15,
    textAlign: "center",
    fontFamily: "montserrat-bold",
    zIndex: 10
  },

  placeholder: {
    opacity: 1,
    borderRadius: 15,
    overflow: "hidden",
    alignSelf: "center",
    width: wp(75),
    height: hp(61),
    zIndex: 0,
    marginTop: 10,
    backgroundColor: "black",
    justifyContent: "center"
  },
  gradient: {
    ...StyleSheet.absoluteFillObject
  },
  closeIcon: {
    top: hp(6),
    left: wp(4.5)
  }
});

export default styles;
