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
  title: { color: "#000", fontSize: 48 },
  container: {
    paddingTop: 20,
    backgroundColor: "black",
    height: heightPercentageToDP(110)
  },
  inputtext: {
    fontFamily: "benton-sans-light",
    fontSize: 14,
    alignSelf: "center",
    textAlign: "center"
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#D9D9D9",
    paddingHorizontal: 50,
    borderRadius: 15,
    alignSelf: "center",
    width: 300,
    height: 50
  },
  buttonN: {
    paddingTop: 0,
    bottom: 15,
    height: heightPercentageToDP("73")
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  image: {
    alignSelf: "center",
    height: 50,
    width: 50,
    margin: 15
  },
  placeholder: {
    borderRadius: 20,
    alignSelf: "center",
    width: widthPercentageToDP("100%"),
    height: "100%",
    zIndex: 0,
    backgroundColor: "black",
    justifyContent: "center"
  },

  mainCard: {
    borderRadius: 40,
    marginTop: 5,
    height: heightPercentageToDP(85),
    marginHorizontal: widthPercentageToDP(0.5)
  },
  brand_name: {
    textAlign: "left",
    color: "#fff",
    paddingTop: 30,
    fontFamily: "montserrat-medium",
    fontSize: 14,
    paddingLeft: 20,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1
  },
  headline: {
    textAlign: "left",
    color: "#fff",
    fontFamily: "montserrat-medium",
    fontSize: 12,
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: -10,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1
  },
  call_to_action: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "benton-sans-medium",
    fontSize: 16,
    bottom: "7%",
    paddingVertical: 17,
    shadowColor: "#000",
    shadowRadius: 5,
    shadowOpacity: 1
  },
  activeBadege: {
    backgroundColor: "#5F5F5F",
    width: 40,
    height: 40,
    borderRadius: 20
  },
  badge: {
    backgroundColor: "#fff",
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: "#5F5F5F",
    borderWidth: 2
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
  title: {
    color: "#fff",
    fontSize: 20,
    marginTop: 90,
    paddingHorizontal: 20,
    textAlign: "center"
  }
});

export default styles;
