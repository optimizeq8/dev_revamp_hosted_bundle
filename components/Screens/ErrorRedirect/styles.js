import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
export const colors = {
  black: "#1a1917",
  gray: "#888888",
  background1: "#751AFF",
  background2: "#6268FF",
};
const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  contentContainerStyle: {
    flexGrow: 1,
    paddingBottom: heightPercentageToDP(35),
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  text: {
    marginTop: RFValue(1.5, 414),
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-medium",
    textAlign: "center",
  },
  details: {
    marginTop: RFValue(5, 414),
    paddingVertical: RFValue(5, 414),
    borderRadius: RFValue(7.5, 414),
    backgroundColor: "rgba(0,0,0,0.3)",
    width: RFValue(125, 414),
  },
  view: {
    // flex: 2,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: RFValue(5, 414),
  },
  media: {
    // flex: 1,
    alignSelf: "center",
    height: heightPercentageToDP(20),
    margin: RFValue(5, 414),
    width: "100%",
    justifyContent: "flex-start",
  },
  errorText: {
    marginTop: RFValue(7.5, 414),
    color: "#fff",
    fontSize: RFValue(7, 414),
    fontFamily: "montserrat-light",
    textAlign: "center",
  },
  button: {
    marginTop: RFValue(12.5, 414),
    backgroundColor: "#FF9D00",
    borderRadius: RFValue(7.5, 414),
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    alignSelf: "center",
    justifyContent: "center",
  },
  whiteButton: {
    marginTop: RFValue(7.5, 414),
    borderColor: "#fff",
    borderRadius: RFValue(7.5, 414),
    borderWidth: 1,
    width: RFValue(125, 414),
    height: RFValue(25, 414),
    alignSelf: "center",
    justifyContent: "center",
  },

  title: {
    marginTop: RFValue(7.5, 414),
    color: "#fff",
    fontSize: RFValue(20.5, 414),
    fontFamily: "montserrat-bold",
  },
});

export default styles;
