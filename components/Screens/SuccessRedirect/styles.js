import { StyleSheet } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from "react-native-responsive-screen";
import { globalColors } from "../../../GlobalStyles";

const styles = StyleSheet.create({
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
    backgroundColor: "#0000",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
  },

  media: {
    alignSelf: "center",
    height: heightPercentageToDP(20),
    width: "100%",
    margin: 10,
    justifyContent: "flex-start",
  },
  errortext: {
    marginTop: 5,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textAlign: "center",
    lineHeight: 18,
  },
  text: {
    marginTop: 3,
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-medium",
    paddingHorizontal: 25,
  },
  details: {
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.3)",
    width: 350,
  },
  button: {
    marginTop: 25,
    borderRadius: 25,
    width: 250,
    height: 50,
    alignSelf: "center",
    justifyContent: "center",
  },

  buttontext: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "montserrat-bold",
  },

  title: {
    marginTop: 15,
    color: "#fff",
    fontSize: 41,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
  },
  codeSentText: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: "#909090",
    textAlign: "center",
  },
  mobileDetailCard: {
    backgroundColor: globalColors.white,
    width: 350,
    paddingVertical: 20,
    borderRadius: 35,
  },
  verifyButton: {
    width: widthPercentageToDP(40),
    height: 40,
    alignSelf: "center",
  },
  bottomText: {
    textAlign: "center",
    fontSize: 14,
    fontFamily: "montserrat-regular",
    textDecorationLine: "underline",
    color: globalColors.orange,
    paddingTop: 20,
  },
  headingText: {
    color: globalColors.white,
    fontSize: 14,
    fontFamily: "montserrat-bold",
    textTransform: "uppercase",
    paddingHorizontal: 25,
  },
  detail: {
    fontFamily: "montserrat-regular",
    fontSize: 12,
    color: globalColors.orange,
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    color: globalColors.rum,
    fontSize: 16,
    fontFamily: "montserrat-bold",
    alignSelf: "center",
    marginBottom: 20,
    textTransform: "uppercase",
  },
});

export default styles;
